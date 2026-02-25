import { ModalState } from "@/types/state";
import { Task, TaskStatus } from "@/types/task";
import { Card, CardDescription } from "../ui/card";
import TaskItem from "./TaskItem";
import { PlusIcon } from "lucide-react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

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
};

const TaskColumn = ({
  status,
  tasks,
  modalState,
  setModalState,
  boardId,
  activeId,
}: Props) => {
  const { setNodeRef } = useDroppable({
    id: status.value,
  });
  const columnTasks = tasks
    .filter((item) => item.status === status.value && boardId === item.boardId)
    .sort((a, b) => a.order - b.order);

  return (
    <Card ref={setNodeRef} id={status.value} className="p-4 gap-3">
      <p>{status.label}</p>
      <SortableContext
        items={columnTasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {columnTasks.map((item) => {
          return (
            <TaskItem
              data={item}
              modalState={modalState}
              setModalState={setModalState}
              key={item.id}
              activeId={activeId}
            />
          );
        })}
      </SortableContext>
      <Card
        className="p-2 flex flex-row gap-2 align-middle cursor-pointer border-0"
        onClick={() => {
          setModalState({
            type: "add-task",
            status: status.value,
            boardId,
          });
        }}
      >
        <PlusIcon size={18} className="text-muted-foreground" />
        <CardDescription>Add New Task</CardDescription>
      </Card>
    </Card>
  );
};

export default TaskColumn;
