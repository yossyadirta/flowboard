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
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OptionDropdown } from "@/components/ui/option-dropdown";
import { PlusIcon, SearchIcon, X } from "lucide-react";
import { AddTaskModal } from "@/components/task/AddTaskModal";
import { Button } from "@/components/ui/button";
import { formatDate, formatDueDate } from "@/lib/utils";
import { EditTaskModal } from "@/components/task/EditTaskModal";
import { Progress } from "@/components/ui/progress";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

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

type ModalState =
  | { type: null }
  | { type: "option-board" }
  | { type: "delete-board" }
  | { type: "edit-board" }
  | { type: "option-task"; taskId: string }
  | { type: "delete-task"; taskId: string }
  | { type: "add-task"; status?: TaskStatus | undefined; boardId: string }
  | { type: "edit-task"; data: Task };

const Page = () => {
  const params = useParams<{ boardId: string }>();
  const router = useRouter();

  const boardId = params.boardId;
  const {
    tasks,
    deleteTask,
    updateTaskContent,
    updateTaskStatus,
    updateTaskOrder,
  } = useTasks();
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

  const handleUpdateTaskStatus = (id: string, status: TaskStatus) => {
    updateTaskStatus(id, "done");
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

  const handleUpdateTaskOrder = (
    id: string,
    order: number,
    status: TaskStatus,
  ) => {
    updateTaskOrder(id, order + 1, status);
  };

  const handleUpdateTaskContent = (task: Task) => {
    updateTaskContent(task);
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
            {TASK_STATUS.map((status) => {
              return (
                <Card className="p-4 gap-3" key={status.id}>
                  <p>{status.title}</p>
                  {visibleTasks
                    .filter(
                      (item) =>
                        item.status === status.id && boardId === item.boardId,
                    )
                    .sort((a, b) => a.order - b.order)
                    .map((item) => {
                      return (
                        <Card className="p-4 cursor-pointer" key={item.id}>
                          <CardHeader className="p-0">
                            <CardAction>
                              <OptionDropdown
                                key={item.id}
                                open={
                                  modalState.type === "option-task" &&
                                  modalState.taskId === item.id
                                }
                                onOpenChange={() => {
                                  if (
                                    modalState.type === "option-task" &&
                                    modalState.taskId === item.id
                                  ) {
                                    setModalState({
                                      type: null,
                                    });
                                  } else {
                                    setModalState({
                                      type: "option-task",
                                      taskId: item.id,
                                    });
                                  }
                                }}
                                onDelete={() => {
                                  setModalState({
                                    type: "delete-task",
                                    taskId: item.id,
                                  });
                                }}
                                onUpdate={() => {
                                  setModalState({
                                    type: "edit-task",
                                    data: item,
                                  });
                                }}
                                btnSize="xs"
                              />
                            </CardAction>
                            <CardTitle>{item?.title}</CardTitle>
                          </CardHeader>
                          <CardDescription>
                            {formatDueDate(item?.dueDate)}
                          </CardDescription>
                          {/* <CardFooter>
                        <Button className="w-full">View Event</Button>
                      </CardFooter> */}
                        </Card>
                      );
                    })}
                  <Card
                    className="p-2 flex flex-row gap-2 align-middle cursor-pointer border-0"
                    onClick={() => {
                      setModalState({
                        type: "add-task",
                        status: status.id,
                        boardId,
                      });
                    }}
                  >
                    <PlusIcon size={18} className="text-muted-foreground" />
                    <CardDescription>Add New Task</CardDescription>
                  </Card>
                </Card>
              );
            })}
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
