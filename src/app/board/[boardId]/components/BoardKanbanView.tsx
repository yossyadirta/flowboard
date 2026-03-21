import React from "react";
import { TASK_STATUS } from "@/schemas/task.schemas";
import { Board } from "@/types/board";
import { Task } from "@/types/task";
import TaskColumn from "@/components/task/TaskColumn";
import {
  DndContext,
  DragCancelEvent,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  closestCorners,
} from "@dnd-kit/core";
import { ModalState } from "@/types/state";
import TaskItem from "@/components/task/TaskItem";

type Props = {
  derived: {
    emoji: string;
    currentBoard: Board | null;
    search: string;
    setSearch: (search: string) => void;
    setFilter: (filter: string) => void;
    visibleTasks: Task[];
    filter: string;
  };
  dnd: {
    activeId: string | null;
    handleDragEnd: (event: DragEndEvent) => void;
    handleDragOver: (event: DragOverEvent) => void;
    handleDragStart: (event: DragStartEvent) => void;
    handleDragCancel: (event: DragCancelEvent) => void;
    handleDeleteTask: (id: string) => void;
  };
  tasks: Record<string, Task>;
  modalState: ModalState;
  setModalState: (data: ModalState) => void;
  boardId: string;
};

const BoardKanbanView = ({
  dnd,
  derived,
  tasks,
  modalState,
  setModalState,
  boardId,
}: Props) => {
  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragCancel={dnd.handleDragCancel}
      onDragStart={dnd.handleDragStart}
      onDragOver={dnd.handleDragOver}
      onDragEnd={dnd.handleDragEnd}
    >
      <div className="grid grid-cols-3 gap-4 items-start">
        {TASK_STATUS.map((status) => {
          return (
            <TaskColumn
              key={status.value}
              status={status}
              tasks={derived.visibleTasks}
              setModalState={setModalState}
              modalState={modalState}
              boardId={boardId}
              activeId={dnd.activeId}
            />
          );
        })}
        <DragOverlay>
          {dnd.activeId ? (
            <TaskItem
              data={tasks[dnd.activeId]}
              isOverlay
              modalState={modalState}
              setModalState={setModalState}
              activeId={null}
            />
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default BoardKanbanView;
