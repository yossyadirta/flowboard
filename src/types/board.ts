import { BoardIconId } from "@/components/board/BoardIcons";

export type Board = {
  id: string;
  key: string;
  icon: BoardIconId;
  name: string;
  createdAt: number;
  isFavorite: boolean;
  taskCounter: number;
};
