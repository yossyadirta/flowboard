"use client";

import { Task, TaskStatus } from "@/types/task";
import { useAppState } from "./useAppState";
import { generateId } from "@/lib/id";
import {
  ADD_TASK,
  DELETE_TASK,
  UPDATE_TASK_CONTENT,
  UPDATE_TASK_DRAG_AND_DROP,
} from "@/state/actions";

export const useTasks = () => {
  const { state, dispatch } = useAppState();

  const tasks = state.tasks;
  const mappedTasks = Object.values(tasks);

  const addTask = (
    boardId: string,
    title: string,
    status: TaskStatus,
    dueDate?: Date,
  ) => {
    const sameColumnTasks = mappedTasks.filter(
      (task) => task.boardId === boardId && task.status === status,
    );
    const maxOrder =
      sameColumnTasks.length > 0
        ? Math.max(...sameColumnTasks.map((t) => t.order))
        : -1;

    const task: Task = {
      id: generateId(),
      boardId,
      title,
      status,
      order: maxOrder + 1,
      createdAt: Date.now(),
      dueDate,
    };

    dispatch({
      type: ADD_TASK,
      payload: {
        task,
      },
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
