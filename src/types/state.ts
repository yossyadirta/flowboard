import { Board } from "./board";
import { Task, TaskStatus } from "./task";

export type AppState = {
  boards: Record<string, Board>;
  tasks: Record<string, Task>;
  isMutating: boolean;
  isFetching: boolean;
};

export type ModalState =
  | { type: null }
  | { type: "option-board" }
  | { type: "delete-board" }
  | { type: "edit-board" }
  | { type: "option-task"; taskId: string }
  | { type: "delete-task"; taskId: string }
  | { type: "add-task"; status?: TaskStatus | undefined; boardId: string }
  | { type: "edit-task"; data: Task };
