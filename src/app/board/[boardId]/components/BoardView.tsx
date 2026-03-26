import React, { useRef } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { List, SearchIcon, SquareKanban, Table2, X } from "lucide-react";
import {
  DragCancelEvent,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModalState } from "@/types/state";
import { Board } from "@/types/board";
import { Task } from "@/types/task";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import BoardKanbanView from "./BoardKanbanView";
import BoardTableView from "./BoardTableView";
import BoardListView from "./BoardListView";
import { cn } from "@/lib/utils";

type Props = {
  derived: {
    emoji: string;
    currentBoard: Board | null;
    search: string;
    visibleTasks: Task[];
    filter: string;
    view: string;
    totalDoneTask: number;
    totalInprogressTask: number;
    totalTodoTask: number;
    totalTask: number;
  };
  actions: {
    setSearch: (search: string) => void;
    setFilter: (filter: string) => void;
    setView: (view: string) => void;
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
  actions,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <div className="flex items-center justify-between border-b">
        <Tabs value={derived.view} onValueChange={actions.setView}>
          <TabsList variant="line" className="border-none">
            <TabsTrigger
              value="kanban"
              className="flex items-center gap-2 cursor-pointer"
            >
              <SquareKanban
                className={cn(
                  "h-6 w-6",
                  derived.view === "kanban" ? "text-primary" : "",
                )}
              />
              Kanban
            </TabsTrigger>

            <TabsTrigger
              value="table"
              className="flex items-center gap-2 cursor-pointer hover:foreground/80"
            >
              <Table2
                className={cn(
                  "h-6 w-6",
                  derived.view === "table" ? "text-primary" : "",
                )}
              />
              Table
            </TabsTrigger>

            <TabsTrigger
              value="list"
              className="flex items-center gap-2 cursor-pointer"
            >
              <List
                className={cn(
                  "h-6 w-6",
                  derived.view === "list" ? "text-primary" : "",
                )}
              />
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
            onChange={(e) => actions.setSearch(e.target.value)}
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
                  actions.setSearch("");
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
            if (value) actions.setFilter(value);
          }}
        >
          <ToggleGroupItem
            value="all"
            aria-label="Filter all"
            className="rounded-2xl cursor-pointer"
          >
            All
          </ToggleGroupItem>
          <ToggleGroupItem
            value="today"
            aria-label="Filter today"
            className="rounded-2xl cursor-pointer"
          >
            today
          </ToggleGroupItem>
          <ToggleGroupItem
            value="overdue"
            aria-label="Filter overdue"
            className="rounded-2xl cursor-pointer"
          >
            Overdue
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex-1 overflow-hidden">
        {derived.view === "kanban" && (
          <BoardKanbanView
            dnd={dnd}
            derived={derived}
            tasks={tasks}
            modalState={modalState}
            setModalState={setModalState}
            boardId={boardId}
          />
        )}

        {derived.view === "table" && (
          <BoardTableView
            tasks={derived.visibleTasks}
            modalState={modalState}
            setModalState={setModalState}
            boardId={boardId}
          />
        )}

        {derived.view === "list" && (
          <BoardListView
            tasks={derived.visibleTasks}
            modalState={modalState}
            setModalState={setModalState}
            boardId={boardId}
          />
        )}
      </div>
    </div>
  );
};

export default BoardColumns;
