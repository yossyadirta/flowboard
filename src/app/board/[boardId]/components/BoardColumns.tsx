import React, { useRef } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { LayoutGrid, List, SearchIcon, Table, X } from "lucide-react";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import TaskItem from "@/components/task/TaskItem";
import { TASK_STATUS } from "@/schemas/task.schemas";
import { ModalState } from "@/types/state";
import { Board } from "@/types/board";
import { Task } from "@/types/task";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between border-b">
        <Tabs defaultValue="kanban">
          <TabsList variant="line" className="border-none">
            <TabsTrigger value="kanban" className="flex items-center gap-2">
              <LayoutGrid className="h-4 w-4" />
              Kanban
            </TabsTrigger>

            <TabsTrigger value="table" className="flex items-center gap-2">
              <Table className="h-4 w-4" />
              Table
            </TabsTrigger>

            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              List
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex items-center gap-2">
        <InputGroup className="w-full max-w-60">
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
        <ToggleGroup
          spacing={2}
          type="single"
          size="sm"
          variant="outline"
          value={derived.filter}
          onValueChange={(value) => {
            if (value) derived.setFilter(value);
          }}
        >
          <ToggleGroupItem
            value="all"
            aria-label="Filter all"
            className="rounded-2xl"
          >
            All
          </ToggleGroupItem>
          <ToggleGroupItem
            value="today"
            aria-label="Filter today"
            className="rounded-2xl"
          >
            today
          </ToggleGroupItem>
          <ToggleGroupItem
            value="overdue"
            aria-label="Filter overdue"
            className="rounded-2xl"
          >
            Overdue
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
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
    </div>
  );
};

export default BoardColumns;
