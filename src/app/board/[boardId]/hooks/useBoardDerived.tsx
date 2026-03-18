"use client";

import { BOARD_ICONS_MAP } from "@/components/board/BoardIcons";
import { useBoards } from "@/hooks/useBoards";
import { useTasks } from "@/hooks/useTasks";
import { useMemo, useState } from "react";

type Props = {
  boardId: string;
};

export const useBoardDerived = ({ boardId }: Props) => {
  const { mappedTasks } = useTasks();
  const { boards } = useBoards();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const formatProgressColor = (percent: number) => {
    if (percent < 30) return "bg-red-500";
    if (percent < 70) return "bg-yellow-500";

    return "bg-green-500";
  };

  const currentBoard = useMemo(() => {
    if (!boardId) return null;

    return boards.find((item) => item.id === boardId) ?? null;
  }, [boardId, boards]);

  const totalTask =
    mappedTasks.filter((item) => item.boardId === boardId).length || 0;
  const totalTodoTask =
    mappedTasks.filter(
      (item) => item.boardId === boardId && item.status === "todo",
    ).length || 0;
  const totalInprogressTask =
    mappedTasks.filter(
      (item) => item.boardId === boardId && item.status === "in-progress",
    ).length || 0;
  const totalDoneTask =
    mappedTasks.filter(
      (item) => item.boardId === boardId && item.status === "done",
    ).length || 0;
  const taskProgress =
    totalTask === 0 ? 0 : Math.round((totalDoneTask / totalTask) * 100);

  const { emoji } = BOARD_ICONS_MAP[currentBoard?.icon ?? "briefcase"];

  const isToday = (date: Date | string) => {
    const d = new Date(date);
    const now = new Date();

    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  };

  const isOverdue = (date: Date | string) => {
    const d = new Date(date);
    const now = new Date();

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const target = new Date(d.getFullYear(), d.getMonth(), d.getDate());

    return target < today;
  };

  const visibleTasks = useMemo(() => {
    return mappedTasks
      .filter((item) => boardId === item.boardId)
      .filter((task) => {
        if (filter === "today") return isToday(task.dueDate);
        if (filter === "overdue") return isOverdue(task.dueDate);
        return true;
      })
      .filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase()),
      );
  }, [filter, search, mappedTasks, boardId]);

  return {
    visibleTasks,
    currentBoard,
    totalDoneTask,
    totalInprogressTask,
    totalTask,
    totalTodoTask,
    taskProgress,
    emoji,
    search,
    filter,

    setSearch,
    setFilter,
    formatProgressColor,
  };
};
