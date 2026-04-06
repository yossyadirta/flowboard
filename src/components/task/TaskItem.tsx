import React, { useState } from "react";
import { Task } from "@/types/task";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { OptionDropdown } from "../ui/option-dropdown";
import { ModalState } from "@/types/state";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Clock, TextAlignStart } from "lucide-react";
import { formatDueDate } from "@/lib/utils";
import Image from "next/image";

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

  const [loading, setLoading] = useState(true);

  const style = !isOverlay
    ? {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: activeId === data.id ? 0 : 1,
      }
    : undefined;

  const isMenuOpen =
    modalState.type === "option-task" && modalState.taskId === data.id;

  return (
    <Card
      className="group relative cursor-pointer border-0 bg-card text-card-foreground rounded-xl shadow-sm transition-all overflow-hidden py-0 gap-0"
      ref={!isOverlay ? setNodeRef : undefined}
      style={style}
      {...(!isOverlay ? attributes : {})}
      {...(!isOverlay ? listeners : {})}
    >
      <div
        className={`absolute top-3 right-3 z-20 transition-opacity duration-200 ${
          isMenuOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
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
              setModalState({ type: null });
            } else {
              setModalState({ type: "option-task", taskId: data.id });
            }
          }}
          onDelete={() =>
            setModalState({ type: "delete-task", taskId: data.id })
          }
          onUpdate={() => setModalState({ type: "edit-task", data: data })}
          btnSize="xs"
        />
      </div>

      {data.cover && (
        <div className="w-full relative">
          {data.cover.type === "color" && (
            <div
              className="w-full h-14"
              style={{ backgroundColor: data.cover.value }}
            />
          )}

          {data.cover.type === "image" && (
            <div className="relative w-full h-32">
              <Image
                src={data.cover.value}
                alt="Task Cover"
                fill
                className={`object-cover transition-opacity ${
                  loading ? "opacity-0" : "opacity-100"
                }`}
                priority
                onLoad={() => setLoading(false)}
              />
            </div>
          )}
        </div>
      )}

      <div className="p-4 pt-3 flex flex-col gap-2.5">
        <CardHeader className="p-0 gap-0">
          <CardTitle className="font-medium text-sm leading-tight pr-6">
            {data?.title}
          </CardTitle>
        </CardHeader>

        {(data?.description || data?.dueDate) && (
          <CardDescription className="text-xs flex items-center gap-1">
            {data?.dueDate && (
              <span className="flex flex-row gap-1 items-center">
                <Clock className="h-3 w-3" />
                {formatDueDate(data?.dueDate)}
              </span>
            )}
            {data?.description && <TextAlignStart className="h-3 w-3" />}
          </CardDescription>
        )}
      </div>
    </Card>
  );
};

export default TaskItem;
