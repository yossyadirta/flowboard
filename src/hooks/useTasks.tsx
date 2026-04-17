"use client";

import { Task, TaskCover, TaskStatus } from "@/types/task";
import { useAppState } from "./useAppState";
import {
  ADD_TASK,
  DELETE_TASK,
  UPDATE_TASK_CONTENT,
  UPDATE_TASK_DRAG_AND_DROP,
} from "@/state/actions";
import { generateId } from "@/lib/id";
import { useBoards } from "./useBoards";

export const useTasks = () => {
  const { state, dispatch } = useAppState();
  const { updateBoard } = useBoards();

  const tasks = state.tasks;
  const mappedTasks = Object.values(tasks);

  const addTask = ({
    boardId,
    title,
    status,
    dueDate,
    description,
    cover,
  }: {
    boardId: string;
    title: string;
    status: TaskStatus;
    dueDate?: Date;
    description?: string;
    cover?: TaskCover;
  }) => {
    const sameColumnTasks = mappedTasks.filter(
      (task) => task.boardId === boardId && task.status === status,
    );
    const maxOrder =
      sameColumnTasks.length > 0
        ? Math.max(...sameColumnTasks.map((t) => t.order))
        : -1;
    const newOrder = maxOrder + 1;

    const board = state.boards[boardId];
    const newCounter = board.taskCounter + 1;

    const task: Task = {
      id: generateId(),
      key: `${board.key}-${newCounter}`,
      boardId,
      title,
      status,
      order: newOrder,
      createdAt: Date.now(),
      dueDate,
      description,
      cover,
    };

    dispatch({
      type: ADD_TASK,
      payload: {
        task,
      },
    });

    updateBoard({
      ...board,
      taskCounter: newCounter,
    });
  };

  const updateTaskContent = (task: Task) => {
    dispatch({
      type: UPDATE_TASK_CONTENT,
      payload: {
        task,
      },
    });
  };

  const updateTaskDragAndDrop = (tasks: Record<string, Task>) => {
    dispatch({
      type: UPDATE_TASK_DRAG_AND_DROP,
      payload: {
        tasks,
      },
    });
  };

  const deleteTask = (taskId: string) => {
    dispatch({
      type: DELETE_TASK,
      payload: {
        taskId,
      },
    });
  };

  return {
    tasks,
    mappedTasks,
    addTask,
    updateTaskContent,
    updateTaskDragAndDrop,
    deleteTask,
  };
};
