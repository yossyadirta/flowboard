import React from "react";
import { ModalState } from "@/types/state";
import { Task } from "@/types/task";

type Props = {
  tasks: Task[];
  modalState: ModalState;
  setModalState: (data: ModalState) => void;
  boardId: string;
};

const BoardTableView = ({ tasks, setModalState }: Props) => {
  return (
    <div className="border rounded-md">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-2 text-left">Task</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Due Date</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(tasks).map((task) => (
            <tr
              key={task.id}
              className="border-t hover:bg-muted/50 cursor-pointer"
              onClick={() => setModalState({ open: true, taskId: task.id })}
            >
              <td className="p-2">{task.title}</td>
              <td className="p-2">{task.status}</td>
              <td className="p-2">{task.dueDate || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BoardTableView;
