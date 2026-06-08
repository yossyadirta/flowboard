"use client";

import { Board } from "@/types/board";
import { useAppState } from "./useAppState";
import {
  ADD_BOARD,
  DELETE_BOARD,
  SET_MUTATING,
  TOGGLE_FAVORITE_BOARD,
  UPDATE_BOARD,
} from "@/state/actions";
import { generateId } from "@/lib/id";
import { BoardIconId } from "@/components/app/board/BoardIcons";

type AddBoardPayload = {
  name: string;
  icon: BoardIconId;
  key: string;
};

export const useBoards = () => {
  const { state, dispatch } = useAppState();

  const boards = Object.values(state.boards);

  const simulateDelay = () => new Promise((resolve) => setTimeout(resolve, 500));

  const addBoard = async (data: AddBoardPayload) => {
    dispatch({ type: SET_MUTATING, payload: true });
    await simulateDelay();

    const { key, ...rest } = data;
    const id = generateId();
    const board: Board = {
      id,
      createdAt: Date.now(),
      isFavorite: false,
      taskCounter: 0,
      key,
      ...rest,
    };

    dispatch({
      type: ADD_BOARD,
      payload: {
        board,
      },
    });

    dispatch({ type: SET_MUTATING, payload: false });
    return key;
  };

  const deleteBoard = async (boardId: string) => {
    dispatch({ type: SET_MUTATING, payload: true });
    await simulateDelay();

    dispatch({
      type: DELETE_BOARD,
      payload: {
        boardId,
      },
    });

    dispatch({ type: SET_MUTATING, payload: false });
  };

  const updateBoard = async (board: Board) => {
    dispatch({ type: SET_MUTATING, payload: true });
    await simulateDelay();

    dispatch({
      type: UPDATE_BOARD,
      payload: {
        board,
      },
    });

    dispatch({ type: SET_MUTATING, payload: false });
  };

  const updateBoardFavorite = async (boardId: string) => {
    const board = boards.find((item) => item.id === boardId);
    if (!board) return;

    dispatch({ type: SET_MUTATING, payload: true });
    await simulateDelay();

    dispatch({
      type: TOGGLE_FAVORITE_BOARD,
      payload: {
        boardId,
      },
    });

    dispatch({ type: SET_MUTATING, payload: false });
  };

  return {
    boards,
    addBoard,
    deleteBoard,
    updateBoard,
    updateBoardFavorite,
  };
};
