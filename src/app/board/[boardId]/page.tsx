"use client";

import React, { useEffect, useEffectEvent, useMemo, useState } from "react";
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
import { PlusIcon } from "lucide-react";

const TASK_STATUS: {
  title: string;
  id: TaskStatus;
}[] = [
  {
    title: "Todo",
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
  | { type: "edit-task"; data: Task };

const Page = () => {
  const params = useParams<{ boardId: string }>();
  const router = useRouter();

  const boardId = params.boardId;
  const {
    tasks,
    addTask,
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

  const handleUpdateMounted = useEffectEvent(() => {
    setMounted(true);
  });

  useEffect(() => {
    handleUpdateMounted();
  }, []);

  const handleAddTask = (status: TaskStatus, dueDate: number) => {
    addTask(boardId, status, status, dueDate);
  };

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
    toast.success("Board has been deleted");
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

  const currentBoard = useMemo(() => {
    if (!boardId) return null;

    return boards.find((item) => item.id === boardId) ?? null;
  }, [boardId, boards]);

  const { emoji } = BOARD_ICONS_MAP[currentBoard?.icon ?? "briefcase"];

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
      <div className="flex gap-12">
        <div className="w-3/4 flex gap-8 flex-col">
          <div className="w-full bg-blue-300">
            <h4>Tasks</h4>
          </div>
          <div className="grid grid-cols-[30%_30%_30%_1fr] gap-4 items-start">
            {TASK_STATUS.map((status) => {
              return (
                <Card className="p-4 gap-3" key={status.id}>
                  <p>{status.title}</p>
                  {tasks
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
                          {/* <CardFooter>
                        <Button className="w-full">View Event</Button>
                      </CardFooter> */}
                        </Card>
                      );
                    })}
                  <Card
                    className="p-2 flex flex-row gap-2 align-middle cursor-pointer border-0"
                    onClick={() => handleAddTask(status.id, 0)}
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
    </div>
  );
};

export default Page;
