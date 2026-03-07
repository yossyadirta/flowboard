import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Board } from "@/types/board";
import { OptionDropdown } from "@/components/ui/option-dropdown";
import { ModalState } from "@/types/state";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
    <div className="pb-4">
      <div className="flex justify-between align-top">
        <div className="flex flex-col gap-3">
          <Avatar className="h-16 w-16 flex items-center justify-center transition-colors">
            <AvatarFallback className="bg-transparent text-5xl">
              {derived.emoji}
            </AvatarFallback>
          </Avatar>
          <h3 className="scroll-m-20 text-3xl font-bold tracking-tight text-balance">
            {derived.currentBoard?.name ?? ""}
          </h3>
          <p className="scroll-m-20 text-md font-medium tracking-tight text-muted-foreground">
            {derived.currentBoard?.description ?? ""}
          </p>
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
            btnClassName="bg-transparent border-0"
          />
        </div>
      </div>
      <br />
      <Button
        variant="outline"
        className="bg-secondary border-2"
        onClick={() => {
          setModalState({
            type: "add-task",
            status: undefined,
            boardId,
          });
        }}
      >
        <Plus className="text-white" />
        Add New Task
      </Button>
    </div>
  );
};

export default BoardHeader;
