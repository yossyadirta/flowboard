"use client";

import React, { useEffect, useEffectEvent, useState } from "react";
import { useParams } from "next/navigation";
import { useTasks } from "@/hooks/useTasks";

import { ModalState } from "@/types/state";
import { useBoardActions } from "./hooks/useBoardActions";
import { useBoardDnd } from "./hooks/useBoardDnd";
import { useBoardDerived } from "./hooks/useBoardDerived";
import BoardHeader from "./components/BoardHeader";
import BoardColumns from "./components/BoardColumns";
import BoardCompletion from "./components/BoardCompletion";
import BoardModals from "./components/BoardModals";

const Page = () => {
  const params = useParams<{ boardId: string }>();
  const boardId = params.boardId;

  const { tasks } = useTasks();
  const actions = useBoardActions({ boardId });
  const dnd = useBoardDnd({ boardId });
  const derived = useBoardDerived({ boardId });

  const [modalState, setModalState] = useState<ModalState>({
    type: null,
  });
  const [mounted, setMounted] = useState(false);

  const handleUpdateMounted = useEffectEvent(() => {
    setMounted(true);
  });

  const closeModal = () => setModalState({ type: null });

  useEffect(() => {
    handleUpdateMounted();
  }, []);

  if (!mounted) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <BoardHeader
        derived={derived}
        mounted={mounted}
        modalState={modalState}
        boardId={boardId}
        setModalState={setModalState}
        closeModal={closeModal}
      />
      <div className="flex gap-12">
        <BoardColumns
          dnd={dnd}
          derived={derived}
          tasks={tasks}
          mounted={mounted}
          modalState={modalState}
          setModalState={setModalState}
          boardId={boardId}
        />
        <BoardCompletion derived={derived} />
      </div>
      <BoardModals
        modalState={modalState}
        closeModal={closeModal}
        actions={actions}
        dnd={dnd}
        derived={derived}
      />
    </div>
  );
};

export default Page;
