import React from "react";
import { Task, TaskStatus } from "@/types/task";
import { useSortable } from "@dnd-kit/react/sortable";
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

type Props = {
  data: Task;
  index: number;
  modalState: ModalState;
  setModalState: (data: ModalState) => void;
  column: TaskStatus;
};

const TaskItem = ({
  data,
  index,
  modalState,
  setModalState,
  column,
}: Props) => {
  const { ref, isDragging } = useSortable({
    id: data.id,
    index,
    type: "item",
    accept: "item",
    group: column,
  });

  return (
    <Card
      className="p-4 cursor-pointer"
      key={data.id}
      ref={ref}
      // id={data.id}
      data-dragging={isDragging}
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
      {/* <CardFooter>
                        <Button className="w-full">View Event</Button>
                      </CardFooter> */}
    </Card>
  );
};

export default TaskItem;
