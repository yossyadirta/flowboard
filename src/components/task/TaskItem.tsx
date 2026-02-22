import React from "react";
import { Task } from "@/types/task";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { OptionDropdown } from "../ui/option-dropdown";
import { formatDueDate } from "@/lib/utils";
import { ModalState } from "@/types/state";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  data: Task;
  modalState: ModalState;
  setModalState: (data: ModalState) => void;
  isOverlay?: boolean;
  activeId?: string | null;
};

const TaskItem = ({
  data,
  modalState,
  setModalState,
  isOverlay,
  activeId,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: data.id,
    });

  const style = !isOverlay
    ? {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: activeId === data.id ? 0 : 1,
      }
    : undefined;

  return (
    <Card
      className="p-4 cursor-pointer"
      ref={!isOverlay ? setNodeRef : undefined}
      style={style}
      {...(!isOverlay ? attributes : {})}
      {...(!isOverlay ? listeners : {})}
    >
      <CardHeader className="p-0">
        <CardAction>
          <OptionDropdown
            key={data.id}
            open={
              modalState.type === "option-task" && modalState.taskId === data.id
            }
            onOpenChange={() => {
              if (
                modalState.type === "option-task" &&
                modalState.taskId === data.id
              ) {
                setModalState({
                  type: null,
                });
              } else {
                setModalState({
                  type: "option-task",
                  taskId: data.id,
                });
              }
            }}
            onDelete={() => {
              setModalState({
                type: "delete-task",
                taskId: data.id,
              });
            }}
            onUpdate={() => {
              setModalState({
                type: "edit-task",
                data: data,
              });
            }}
            btnSize="xs"
          />
        </CardAction>
        <CardTitle>{data?.title}</CardTitle>
      </CardHeader>
      <CardDescription>{formatDueDate(data?.dueDate)}</CardDescription>
    </Card>
  );
};

export default TaskItem;
