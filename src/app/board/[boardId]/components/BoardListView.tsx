import React from "react";
import { Board } from "@/types/board";
import { ModalState } from "@/types/state";
import { Task } from "@/types/task";

type Props = {
  tasks: Task[];
  modalState: ModalState;
  setModalState: (data: ModalState) => void;
  boardId: string;
};

const BoardListView = ({ tasks, setModalState }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      {Object.values(tasks).map((task) => (
        <div
          key={task.id}
          className="p-3 border rounded-md hover:bg-muted cursor-pointer"
          onClick={() => setModalState({ open: true, taskId: task.id })}
        >
          <div className="font-medium">{task.title}</div>
          <div className="text-xs text-muted-foreground">
            {task.status} • {task.dueDate || "No deadline"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoardListView;
