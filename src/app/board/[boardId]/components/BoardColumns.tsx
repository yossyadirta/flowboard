import React, { useRef } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import TaskItem from "@/components/task/TaskItem";
import { TASK_STATUS } from "@/schemas/task.schemas";
import { ModalState } from "@/types/state";
import { Board } from "@/types/board";
import { Task } from "@/types/task";

type Props = {
  derived: {
    emoji: string;
    currentBoard: Board | null;
    search: string;
    setSearch: (search: string) => void;
    setFilter: (filter: string) => void;
    visibleTasks: Task[];
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
  mounted: boolean;
  modalState: ModalState;
  setModalState: (data: ModalState) => void;
  boardId: string;
};

const BoardColumns = ({
  dnd,
  derived,
  tasks,
  modalState,
  setModalState,
  boardId,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-3/4 flex flex-col gap-4">
      <h3 className="font-bold text-2xl tracking-tight text-balance">Tasks</h3>
      <div>
        <InputGroup>
          <InputGroupInput
            placeholder="Search..."
            value={derived.search}
            onChange={(e) => derived.setSearch(e.target.value)}
            ref={inputRef}
          />

          <InputGroupAddon>
            <SearchIcon className="text-muted-foreground" />
          </InputGroupAddon>
          {derived.search && (
            <InputGroupAddon align="inline-end">
              <button
                type="button"
                onClick={() => {
                  derived.setSearch("");
                  inputRef.current?.focus();
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={16} />
              </button>
            </InputGroupAddon>
          )}
        </InputGroup>
        <Button onClick={() => derived.setFilter("all")}>All</Button>
        <Button onClick={() => derived.setFilter("today")}>Today</Button>
        <Button onClick={() => derived.setFilter("overdue")}>Overdue</Button>
      </div>
      <DndContext
        collisionDetection={closestCorners}
        onDragCancel={dnd.handleDragCancel}
        onDragStart={dnd.handleDragStart}
        onDragOver={dnd.handleDragOver}
        onDragEnd={dnd.handleDragEnd}
      >
        <div className="grid grid-cols-[30%_30%_30%_1fr] gap-4 items-start">
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
    </div>
  );
};

export default BoardColumns;
