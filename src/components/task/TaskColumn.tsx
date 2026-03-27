import { ModalState } from "@/types/state";
import { Task, TaskStatus } from "@/types/task";
import { Card } from "../ui/card";
import TaskItem from "./TaskItem";
import { PlusIcon } from "lucide-react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";

type Props = {
  status: {
    label: string;
    value: TaskStatus;
  };
  modalState: ModalState;
  tasks: Task[];
  setModalState: (data: ModalState) => void;
  boardId: string;
  activeId?: string | null;
  derived: {
    totalDoneTask: number;
    totalInprogressTask: number;
    totalTask: number;
    totalTodoTask: number;
  };
};

const TaskColumn = ({
  status,
  tasks,
  modalState,
  setModalState,
  boardId,
  activeId,
  derived,
}: Props) => {
  const { setNodeRef } = useDroppable({
    id: status.value,
  });

  const columnTasks = tasks
    .filter((item) => item.status === status.value && boardId === item.boardId)
    .sort((a, b) => a.order - b.order);

  const count =
    status.value === "todo"
      ? derived.totalTodoTask
      : status.value === "in-progress"
        ? derived.totalInprogressTask
        : status.value === "done"
          ? derived.totalDoneTask
          : 0;

  return (
    <Card
      ref={setNodeRef}
      id={status.value}
      className="p-3 flex flex-col h-auto max-h-full overflow-hidden gap-2"
    >
      <div className="shrink-0 flex items-center justify-between text-sm font-medium">
        <span>{status.label}</span>
        <span className="ml-2 bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-xs">
          {count}
        </span>
      </div>

      <ScrollArea className="min-h-0 -mr-3 pr-3 overflow-hidden grid">
        <div className="flex flex-col gap-2">
          <SortableContext
            items={columnTasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {columnTasks.map((item) => (
              <TaskItem
                data={item}
                modalState={modalState}
                setModalState={setModalState}
                key={item.id}
                activeId={activeId}
              />
            ))}
          </SortableContext>
        </div>
      </ScrollArea>

      <Button
        onClick={() => {
          setModalState({
            type: "add-task",
            status: status.value,
            boardId,
          });
        }}
        variant="outline"
        className="shrink-0 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer border-0 bg-transparent! hover:bg-transparent focus:ring-0 data-[state=open]:bg-transparent p-0! justify-start shadow-none"
      >
        <PlusIcon size={16} />
        Add New Task
      </Button>
    </Card>
  );
};

export default TaskColumn;
