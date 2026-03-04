import React from "react";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import { EditBoardModal } from "@/components/board/EditBoardModal";
import { AddTaskModal } from "@/components/task/AddTaskModal";
import { EditTaskModal } from "@/components/task/EditTaskModal";
import { ModalState } from "@/types/state";
import { Board } from "@/types/board";

type Props = {
  modalState: ModalState;
  closeModal: () => void;
  derived: {
    currentBoard: Board | null;
  };
  dnd: {
    activeId: string | null;
    handleDeleteTask: (id: string) => void;
  };
  actions: {
    handleDeleteBoard: () => void;
  };
};

const BoardModals = ({
  modalState,
  closeModal,
  actions,
  dnd,
  derived,
}: Props) => {
  const stateTypeValue = modalState.type ? modalState.type.split("-")[1] : "";

  const stateType =
    stateTypeValue.charAt(0).toUpperCase() + stateTypeValue.slice(1);

  return (
    <>
      <ConfirmDialog
        open={
          modalState.type === "delete-board" ||
          modalState.type === "delete-task"
        }
        onClose={closeModal}
        title={`Delete ${stateType}?`}
        description={`This will permanently delete this ${stateTypeValue}. Are you sure want to delete?`}
        onDelete={() => {
          if (modalState.type === "delete-board") {
            return actions.handleDeleteBoard();
          }
          if (modalState.type === "delete-task") {
            if (!modalState.taskId) return null;
            return dnd.handleDeleteTask(modalState?.taskId);
          }
          return null;
        }}
      />
      <EditBoardModal
        open={modalState.type === "edit-board"}
        data={derived.currentBoard}
        onClose={closeModal}
      />
      <AddTaskModal
        open={modalState.type === "add-task"}
        status={modalState.type === "add-task" ? modalState?.status : undefined}
        boardId={modalState.type === "add-task" ? modalState?.boardId : ""}
        onClose={closeModal}
      />
      <EditTaskModal
        open={modalState.type === "edit-task"}
        data={modalState.type === "edit-task" ? modalState?.data : null}
        onClose={closeModal}
      />
    </>
  );
};

export default BoardModals;
