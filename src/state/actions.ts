import { Board } from "@/types/board";
import { Task } from "@/types/task";

export const ADD_BOARD = "ADD_BOARD";
export const DELETE_BOARD = "DELETE_BOARD";
export const UPDATE_BOARD = "UPDATE_BOARD";
export const TOGGLE_FAVORITE_BOARD = "TOGGLE_FAVORITE_BOARD";

export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const UPDATE_TASK_CONTENT = "UPDATE_TASK_CONTENT";
export const UPDATE_TASK_DRAG_AND_DROP = "UPDATE_TASK_DRAG_AND_DROP";

export const SET_MUTATING = "SET_MUTATING";
export const SET_FETCHING = "SET_FETCHING";

/* =========================
  BOARD ACTIONS
========================= */
export type AddBoardAction = {
  type: typeof ADD_BOARD;
  payload: {
    board: Board;
  };
};

export type DeleteBoardAction = {
  type: typeof DELETE_BOARD;
  payload: {
    boardId: string;
  };
};

export type UpdateBoardAction = {
  type: typeof UPDATE_BOARD;
  payload: {
    board: Board;
  };
};

export type ToggleFavoriteBoardAction = {
  type: typeof TOGGLE_FAVORITE_BOARD;
  payload: {
    boardId: string;
  };
};

/* =========================
  TASK ACTIONS
========================= */
export type AddTaskAction = {
  type: typeof ADD_TASK;
  payload: {
    task: Task;
  };
};

export type DeleteTaskAction = {
  type: typeof DELETE_TASK;
  payload: {
    taskId: string;
  };
};

export type UpdateTaskContentAction = {
  type: typeof UPDATE_TASK_CONTENT;
  payload: {
    task: Task;
  };
};

export type UpdateTaskDragAndDropAction = {
  type: typeof UPDATE_TASK_DRAG_AND_DROP;
  payload: {
    tasks: Record<string, Task>;
  };
};

/* =========================
  LOADING ACTIONS
========================= */
export type SetMutatingAction = {
  type: typeof SET_MUTATING;
  payload: boolean;
};

export type SetFetchingAction = {
  type: typeof SET_FETCHING;
  payload: boolean;
};

/* =========================
  UNION ACTION
========================= */
export type Action =
  | AddBoardAction
  | DeleteBoardAction
  | UpdateBoardAction
  | ToggleFavoriteBoardAction
  | AddTaskAction
  | UpdateTaskContentAction
  | DeleteTaskAction
  | UpdateTaskDragAndDropAction
  | SetMutatingAction
  | SetFetchingAction;
