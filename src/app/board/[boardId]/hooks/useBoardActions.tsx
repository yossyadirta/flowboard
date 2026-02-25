"use client";

import { useBoards } from "@/hooks/useBoards";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Props = {
  boardId: string;
};

export const useBoardActions = ({ boardId }: Props) => {
  const router = useRouter();

  const { boards, deleteBoard } = useBoards();

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

  return {
    handleDeleteBoard,
  };
};
