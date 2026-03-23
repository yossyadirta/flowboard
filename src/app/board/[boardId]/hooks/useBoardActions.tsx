"use client";

import { useBoards } from "@/hooks/useBoards";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

type Props = {
  boardId: string;
};

export const useBoardActions = ({ boardId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { boards, deleteBoard, updateBoardFavorite } = useBoards();

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const getNextBoardId = () => {
    const index = boards.findIndex((item) => item.id === boardId);
    if (index === -1) return null;
    if (boards[index + 1]) return boards[index + 1].id;
    if (boards[index - 1]) return boards[index - 1].id;

    return null;
  };

  const handleDeleteBoard = () => {
    const nextBoardId = getNextBoardId();
    deleteBoard(boardId);

    if (nextBoardId) {
      router.push(`/board/${nextBoardId}`);
    } else {
      router.push("/board");
    }
    toast.success("Board has been deleted", {
      description: formatDate(new Date(), true),
      position: "top-center",
    });
  };

  const onToggleFavorite = (boardId: string) => {
    const board = boards.find((item) => item.id === boardId);
    if (!board) return;
    const isFavorite = board.isFavorite;
    updateBoardFavorite(boardId);
    toast.success(
      `Board has been ${!isFavorite ? "added to" : "removed from"} favorites`,
      {
        description: formatDate(new Date(), true),
        position: "top-center",
      },
    );
  };

  return {
    handleDeleteBoard,
    onToggleFavorite,
    setSearch: (value: string) => updateQuery("search", value),
    setFilter: (value: string) => updateQuery("filter", value),
    setView: (value: string) => updateQuery("view", value),
  };
};
