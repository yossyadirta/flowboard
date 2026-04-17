export type TaskStatus = "todo" | "in-progress" | "done";

export type TaskCover =
  | { type: "none" }
  | { type: "color"; value: string }
  | { type: "image"; value: string };

export type Task = {
  id: string;
  key: string;
  title: string;
  status: TaskStatus;
  boardId: string;
  order: number;
  createdAt: number;
  dueDate?: Date;
  cover?: TaskCover;
  description?: string;
};
