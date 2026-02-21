import { ModalState } from "@/types/state";
import { Task, TaskStatus } from "@/types/task";
import { Card, CardDescription } from "../ui/card";
import TaskItem from "./TaskItem";
import { PlusIcon } from "lucide-react";
import { CollisionPriority } from "@dnd-kit/abstract";
import { useDroppable } from "@dnd-kit/react";

type Props = {
  status: {
    title: string;
    id: TaskStatus;
  };
  modalState: ModalState;
  tasks: Task[];
  setModalState: (data: ModalState) => void;
  boardId: string;
};

const TaskColumn = ({
  status,
  tasks,
  modalState,
  setModalState,
  boardId,
}: Props) => {
  const { isDropTarget, ref } = useDroppable({
    id: status.id,
    type: "column",
    collisionPriority: CollisionPriority.Low,
    accept: "item",
  });

  const style = isDropTarget ? { background: "#00000030" } : undefined;

  return (
    <Card id={status.id} className="p-4 gap-3" ref={ref} style={style}>
      <p>{status.title}</p>
      {tasks
        .filter((item) => item.status === status.id && boardId === item.boardId)
        .sort((a, b) => a.order - b.order)
        .map((item, index) => {
          return (
            <TaskItem
              data={item}
              index={index}
              modalState={modalState}
              setModalState={setModalState}
              key={item.id}
              column={status.id}
            />
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
};

export default TaskColumn;
