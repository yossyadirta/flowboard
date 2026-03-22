import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Board } from "@/types/board";
import { OptionDropdown } from "@/components/ui/option-dropdown";
import { ModalState } from "@/types/state";
import { Star } from "lucide-react";

type Props = {
  derived: {
    emoji: string;
    currentBoard: Board | null;
  };
  mounted: boolean;
  modalState: ModalState;
  setModalState: (data: ModalState) => void;
  closeModal: () => void;
  onToggleFavorite: (boardId: string) => void;
  isFavorite: boolean;
};

const BoardHeader = ({
  derived,
  setModalState,
  modalState,
  closeModal,
  onToggleFavorite,
  isFavorite,
}: Props) => {
  return (
    <div className="pt-6 pb-4">
      <div className="flex justify-between align-top">
        <div className="flex flex-row gap-3 items-center align-middle">
          <Avatar className="flex items-center justify-center transition-colors bg-secondary rounded-md w-8.5 h-8.5">
            <AvatarFallback className="bg-secondary text-md">
              {derived.emoji}
            </AvatarFallback>
          </Avatar>
          <h3 className="scroll-m-20 text-xl font-bold tracking-tight text-balance align-middle">
            {derived.currentBoard?.name ?? ""}
          </h3>
        </div>
        <div>
          <button
            onClick={() => {
              if (derived.currentBoard?.id) {
                onToggleFavorite(derived.currentBoard.id);
              }
            }}
            className="p-2 rounded-md hover:bg-muted transition-colors"
          >
            <Star
              className={`h-5 w-5 transition-colors ${
                isFavorite
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              }`}
            />
          </button>
          <OptionDropdown
            open={modalState.type === "option-board"}
            onOpenChange={() => {
              if (modalState.type === "option-board") {
                closeModal();
              } else {
                setModalState({
                  type: "option-board",
                });
              }
            }}
            onDelete={() => {
              setModalState({
                type: "delete-board",
              });
            }}
            onUpdate={() => {
              setModalState({
                type: "edit-board",
              });
            }}
            btnClassName="bg-transparent border-0"
          />
        </div>
      </div>
    </div>
  );
};

export default BoardHeader;
