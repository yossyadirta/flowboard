"use client";

import React, {
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import { useParams } from "next/navigation";
import { useTasks } from "@/hooks/useTasks";
import { Task, TaskStatus } from "@/types/task";
import { useBoards } from "@/hooks/useBoards";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BOARD_ICONS_MAP } from "@/components/board/BoardIcons";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import { useRouter } from "next/navigation";
import { EditBoardModal } from "@/components/board/EditBoardModal";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { OptionDropdown } from "@/components/ui/option-dropdown";
import { SearchIcon, X } from "lucide-react";
import { AddTaskModal } from "@/components/task/AddTaskModal";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { EditTaskModal } from "@/components/task/EditTaskModal";
import { Progress } from "@/components/ui/progress";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { DragDropProvider, useDroppable } from "@dnd-kit/react";
import TaskColumn from "@/components/task/TaskColumn";
import { ModalState } from "@/types/state";

const TASK_STATUS: {
  title: string;
  id: TaskStatus;
}[] = [
  {
    title: "To do",
    id: "todo",
  },
  {
    title: "In Progress",
    id: "in-progress",
  },
  {
    title: "Done",
    id: "done",
  },
];

const Page = () => {
  const params = useParams<{ boardId: string }>();
  const router = useRouter();

  const boardId = params.boardId;
  const { tasks, deleteTask, updateTaskDragAndDrop } = useTasks();
  const { boards, deleteBoard } = useBoards();

  const [modalState, setModalState] = useState<ModalState>({
    type: null,
  });
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpdateMounted = useEffectEvent(() => {
    setMounted(true);
  });

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
  };

  const getNextBoardId = () => {
    const index = boards.findIndex((item) => item.id === boardId);
    if (index === -1) return null;
    if (boards[index + 1]) return boards[index + 1].id;
    if (boards[index - 1]) return boards[index - 1].id;

    return null;
  };

  const handleDeleteBoard = () => {
    const nextBoardId = getNextBoardId();
    deleteBoard(boardId);

    if (nextBoardId) {
      router.push(`/board/${nextBoardId}`);
    } else {
      router.push("/board");
    }
    toast.success("Board has been deleted", {
      description: formatDate(new Date(), true),
      position: "top-center",
    });
  };

  const formatProgressColor = (percent: number) => {
    if (percent < 30) return "bg-red-500";
    if (percent < 70) return "bg-yellow-500";

    return "bg-green-500";
  };

  const currentBoard = useMemo(() => {
    if (!boardId) return null;

    return boards.find((item) => item.id === boardId) ?? null;
  }, [boardId, boards]);

  const totalTask =
    tasks.filter((item) => item.boardId === boardId).length || 0;
  const totalTodoTask =
    tasks.filter((item) => item.boardId === boardId && item.status === "todo")
      .length || 0;
  const totalInprogressTask =
    tasks.filter(
      (item) => item.boardId === boardId && item.status === "in-progress",
    ).length || 0;
  const totalDoneTask =
    tasks.filter((item) => item.boardId === boardId && item.status === "done")
      .length || 0;
  const taskProgress =
    totalTask === 0 ? 0 : Math.round((totalDoneTask / totalTask) * 100);

  const { emoji } = BOARD_ICONS_MAP[currentBoard?.icon ?? "briefcase"];

  const isToday = (date: Date | string) => {
    const d = new Date(date);
    const now = new Date();

    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  };

  const isOverdue = (date: Date | string) => {
    const d = new Date(date);
    const now = new Date();

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const target = new Date(d.getFullYear(), d.getMonth(), d.getDate());

    const diffMs = target.getTime() - today.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    return diffDays === -1;
  };

  const visibleTasks = useMemo(() => {
    return tasks
      .filter((item) => boardId === item.boardId)
      .filter((task) => {
        if (filter === "today") return isToday(task.dueDate);
        if (filter === "overdue") return isOverdue(task.dueDate);
        return true;
      })
      .filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase()),
      );
  }, [filter, search, tasks, boardId]);

  useEffect(() => {
    handleUpdateMounted();
  }, []);

  if (!mounted) {
    return <div>Loading</div>;
  }

  function recalculateOrder(tasks: Task[]) {
    // Reset ulang order berdasarkan posisi array saat ini
    return tasks.map((task, index) => ({
      ...task,
      order: index + 1, // order dimulai dari 1
    }));
  }

  const handleDragEnd = (event) => {
    const { source, target } = event.operation;
    // Kalau drop di luar droppable area → abaikan
    if (!target) return;

    const sourceId = source.id;
    const targetId = target.id;

    // Kalau drop ke dirinya sendiri → tidak perlu apa-apa
    if (sourceId === targetId) return;

    // Ambil task langsung dari record (lookup O(1))
    const sourceTask = tasks.find((item) => item.id === sourceId);
    const targetTask = tasks.find((item) => item.id === targetId);

    // Safety check
    if (!sourceTask || !targetTask) return;

    const sourceColumn = sourceTask.status;
    const targetColumn = targetTask.status;
    const boardId = sourceTask.boardId;

    // Ambil semua task di column asal dalam board yang sama
    const sourceColumnTasks = tasks
      .filter((t) => t.boardId === boardId && t.status === sourceColumn)
      .sort((a, b) => a.order - b.order);

    // Kalau beda column, ambil juga column target
    const targetColumnTasks =
      sourceColumn === targetColumn
        ? sourceColumnTasks
        : tasks
            .filter((t) => t.boardId === boardId && t.status === targetColumn)
            .sort((a, b) => a.order - b.order);

    console.log({ sourceColumnTasks, targetColumnTasks });

    // Cari posisi lama dan posisi target
    const sourceIndex = sourceColumnTasks.findIndex((t) => t.id === sourceId);

    const targetIndex = targetColumnTasks.findIndex((t) => t.id === targetId);

    // ===============================
    // CASE 1: Reorder dalam column yang sama
    // ===============================
    if (sourceColumn === targetColumn) {
      // Hapus task dari posisi lama
      const [moved] = sourceColumnTasks.splice(sourceIndex, 1);

      // Masukkan ke posisi baru
      sourceColumnTasks.splice(targetIndex, 0, moved);

      // Reset ulang order supaya konsisten
      const updatedColumn = recalculateOrder(sourceColumnTasks);
      console.log({ updatedColumn }, "<< same col");

      updateTaskDragAndDrop(updatedColumn);

      return;
    }

    // ===============================
    // CASE 2: Pindah ke column berbeda
    // ===============================

    // Hapus dari column lama
    const [moved] = sourceColumnTasks.splice(sourceIndex, 1);

    // Update status task
    const updatedMoved = {
      ...moved,
      status: targetColumn,
    };

    // Masukkan ke column baru
    targetColumnTasks.splice(targetIndex, 0, updatedMoved);

    // Reset ulang order di kedua column
    const updatedSource = recalculateOrder(sourceColumnTasks);
    const updatedTarget = recalculateOrder(targetColumnTasks);

    updateTaskDragAndDrop([...updatedSource, ...updatedTarget]);
  };

  return (
    <div>
      <div className="flex justify-between align-top">
        <div className="flex flex-col gap-2">
          <Avatar className="h-21 w-21 flex items-center justify-center transition-colors">
            <AvatarFallback className="bg-transparent text-3xl">
              {emoji}
            </AvatarFallback>
          </Avatar>
          <h3 className="scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-balance">
            {currentBoard?.name ?? ""}
          </h3>
        </div>
        <div>
          <OptionDropdown
            open={modalState.type === "option-board"}
            onOpenChange={() => {
              if (modalState.type === "option-board") {
                setModalState({
                  type: null,
                });
              } else {
                setModalState({
                  type: "option-board",
                });
              }
            }}
            onDelete={() => {
              setModalState({
                type: "delete-board",
              });
            }}
            onUpdate={() => {
              setModalState({
                type: "edit-board",
              });
            }}
          />
        </div>
      </div>
      <br />
      <Button
        onClick={() => {
          setModalState({
            type: "add-task",
            status: undefined,
            boardId,
          });
        }}
      >
        Add New Task
      </Button>
      <div className="flex gap-12">
        <div className="w-3/4 flex gap-8 flex-col">
          <div className="w-full bg-blue-300">
            <h4>Tasks</h4>
          </div>
          <div>
            <InputGroup>
              <InputGroupInput
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                ref={inputRef}
              />

              <InputGroupAddon>
                <SearchIcon className="text-muted-foreground" />
              </InputGroupAddon>
              {search && (
                <InputGroupAddon align="inline-end">
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      inputRef.current?.focus();
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={16} />
                  </button>
                </InputGroupAddon>
              )}
            </InputGroup>
            <Button onClick={() => setFilter("all")}>All</Button>
            <Button onClick={() => setFilter("today")}>Today</Button>
            <Button onClick={() => setFilter("overdue")}>Overdue</Button>
          </div>
          <div className="grid grid-cols-[30%_30%_30%_1fr] gap-4 items-start">
            <DragDropProvider onDragEnd={handleDragEnd}>
              {TASK_STATUS.map((status, index) => {
                return (
                  <TaskColumn
                    status={status}
                    setModalState={setModalState}
                    modalState={modalState}
                    key={status.id}
                    tasks={visibleTasks}
                    boardId={boardId}
                  />
                );
              })}
            </DragDropProvider>
          </div>
        </div>
        <div className="w-1/4">
          <div className="w-full bg-blue-300">
            <h4>Completion</h4>
          </div>
          <Card>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Board Completion</span>
                <span>{taskProgress}%</span>
              </div>
              <Progress
                value={taskProgress}
                progressColor={formatProgressColor(taskProgress)}
              />
            </div>
            <p>
              {totalTask - totalDoneTask} of {totalTask} tasks completed
            </p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-red-500">To do</span>
                <span>{totalTodoTask}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-yellow-500">In Progress</span>
                <span>{totalInprogressTask}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-green-500">Done</span>
                <span>{totalDoneTask}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <ConfirmDialog
        open={
          modalState.type === "delete-board" ||
          modalState.type === "delete-task"
        }
        onClose={() =>
          setModalState({
            type: null,
          })
        }
        title={`Delete ${modalState.type}?`}
        description={`This will permanently delete this ${modalState.type}. Are you sure want to delete?`}
        onDelete={() => {
          if (modalState.type === "delete-board") {
            return handleDeleteBoard();
          }
          if (modalState.type === "delete-task") {
            if (!modalState.taskId) return null;
            return handleDeleteTask(modalState?.taskId);
          }
          return null;
        }}
      />
      <EditBoardModal
        open={modalState.type === "edit-board"}
        data={currentBoard}
        onClose={() => {
          setModalState({
            type: null,
          });
        }}
      />
      <AddTaskModal
        open={modalState.type === "add-task"}
        status={modalState.type === "add-task" ? modalState?.status : undefined}
        boardId={modalState.type === "add-task" ? modalState?.boardId : ""}
        onClose={() => {
          setModalState({
            type: null,
          });
        }}
      />
      <EditTaskModal
        open={modalState.type === "edit-task"}
        data={modalState.type === "edit-task" ? modalState?.data : null}
        onClose={() => {
          setModalState({
            type: null,
          });
        }}
      />
    </div>
  );
};

export default Page;
