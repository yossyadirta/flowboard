import React from "react";
import { TASK_STATUS } from "@/schemas/task.schemas";
import { Board } from "@/types/board";
import { Task } from "@/types/task";
import TaskColumn from "@/components/app/task/TaskColumn";
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
import TaskItem from "@/components/app/task/TaskItem";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type Props = {
  derived: {
    emoji: string;
    currentBoard: Board | null;
    search: string;
    visibleTasks: Task[];
    filter: string;
    totalDoneTask: number;
    totalInprogressTask: number;
    totalTodoTask: number;
    totalTask: number;
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
      <ScrollArea className="w-full h-full whitespace-nowrap [&>div>div]:block! [&>div>div]:h-full!">
        <div className="grid grid-flow-col auto-cols-[300px] gap-4 items-start h-full w-max pb-4">
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
                derived={derived}
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
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </DndContext>
  );
};

export default BoardKanbanView;
