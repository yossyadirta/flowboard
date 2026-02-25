import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Board } from "@/types/board";
import { OptionDropdown } from "@/components/ui/option-dropdown";
import { ModalState } from "@/types/state";
import { Button } from "@/components/ui/button";

type Props = {
  derived: {
    emoji: string;
    currentBoard: Board | null;
  };
  mounted: boolean;
  modalState: ModalState;
  setModalState: (data: ModalState) => void;
  closeModal: () => void;
  boardId: string;
};

const BoardHeader = ({
  derived,
  setModalState,
  modalState,
  closeModal,
  boardId,
}: Props) => {
  return (
    <>
      <div className="flex justify-between align-top">
        <div className="flex flex-col gap-2">
          <Avatar className="h-21 w-21 flex items-center justify-center transition-colors">
            <AvatarFallback className="bg-transparent text-3xl">
              {derived.emoji}
            </AvatarFallback>
          </Avatar>
          <h3 className="scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-balance">
            {derived.currentBoard?.name ?? ""}
          </h3>
        </div>
        <div>
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
          />
        </div>
      </div>
      <br />
      <Button
        onClick={() => {
          setModalState({
            type: "add-task",
            status: undefined,
            boardId,
          });
        }}
      >
        Add New Task
      </Button>
    </>
  );
};

export default BoardHeader;
