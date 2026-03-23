"use client";

import { Board } from "@/types/board";
import { useAppState } from "./useAppState";
import {
  ADD_BOARD,
  DELETE_BOARD,
  TOGGLE_FAVORITE_BOARD,
  UPDATE_BOARD,
} from "@/state/actions";

export const useBoards = () => {
  const { state, dispatch } = useAppState();

  const boards = Object.values(state.boards);

  const addBoard = (board: Board) => {
    board.createdAt = Date.now();

    dispatch({
      type: ADD_BOARD,
      payload: {
        board,
      },
    });
  };

  const deleteBoard = (boardId: string) => {
    dispatch({
      type: DELETE_BOARD,
      payload: {
        boardId,
      },
    });
  };

  const updateBoard = (board: Board) => {
    dispatch({
      type: UPDATE_BOARD,
      payload: {
        board,
      },
    });
  };

  const updateBoardFavorite = (boardId: string) => {
    const board = boards.find((item) => item.id === boardId);
    if (!board) return;

    dispatch({
      type: TOGGLE_FAVORITE_BOARD,
      payload: {
        boardId,
      },
    });
  };

  return {
    boards,
    addBoard,
    deleteBoard,
    updateBoard,
    updateBoardFavorite,
  };
};
