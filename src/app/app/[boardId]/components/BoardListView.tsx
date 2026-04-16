"use client";

import React, { useState, useMemo, useRef } from "react";
import {
  AlignLeft,
  ArrowUpDown,
  ImageIcon,
  MoreHorizontal,
  Palette,
  Pencil,
  Trash2,
  CalendarIcon,
  CheckCircle2,
  Circle,
  Timer,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { formatDueDate } from "@/lib/utils";
import { Task } from "@/types/task";
import { TASK_STATUS } from "@/schemas/task.schemas";
import { ModalState } from "@/types/state";
import { useIsOverflow } from "@/hooks/useIsOverflow";

type Props = {
  tasks: Task[];
  modalState: ModalState;
  setModalState: (data: ModalState) => void;
  boardId: string;
};

type SortOption = "dueDate-asc" | "dueDate-desc" | "title-asc" | "title-desc";

export const BoardListView = ({ tasks, setModalState }: Props) => {
  const [sortOption, setSortOption] = useState<SortOption>("dueDate-asc");

  const groupedTasks = useMemo(() => {
    const groups: Record<string, Task[]> = {};
    TASK_STATUS.forEach((status) => {
      groups[status.value] = [];
    });

    tasks.forEach((task) => {
      if (groups[task.status]) {
        groups[task.status].push(task);
      } else {
        if (!groups["UNCATEGORIZED"]) groups["UNCATEGORIZED"] = [];
        groups["UNCATEGORIZED"].push(task);
      }
    });

    // 3. Sort each group based on the selected sortOption
    Object.keys(groups).forEach((key) => {
      groups[key].sort((a, b) => {
        if (sortOption.startsWith("dueDate")) {
          const dateA = new Date(a.dueDate || "9999-12-31").getTime();
          const dateB = new Date(b.dueDate || "9999-12-31").getTime();
          return sortOption.endsWith("asc") ? dateA - dateB : dateB - dateA;
        } else if (sortOption.startsWith("title")) {
          return sortOption.endsWith("asc")
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        }
        return 0;
      });
    });

    return groups;
  }, [tasks, sortOption]);

  // Determine active accordion panels by default (open all if not too many, or just specific ones)
  const defaultOpenGroups = Object.keys(groupedTasks).filter(
    (key) => groupedTasks[key].length > 0,
  );

  const getStatusIcon = (statusValue: string) => {
    if (statusValue === "DONE")
      return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
    if (statusValue === "DOING")
      return <Timer className="h-4 w-4 text-blue-500" />;
    return <Circle className="h-4 w-4 text-slate-400" />;
  };

  return (
    <div className="flex-1 space-y-4 h-full flex flex-col">
      {/* List Toolbar: Contains Sorting Action */}
      <div className="flex items-center justify-end px-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 shadow-sm">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Sort by
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Due Date</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setSortOption("dueDate-asc")}>
              Earliest First
              {sortOption === "dueDate-asc" && (
                <CheckCircle2 className="ml-auto h-4 w-4" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption("dueDate-desc")}>
              Latest First
              {sortOption === "dueDate-desc" && (
                <CheckCircle2 className="ml-auto h-4 w-4" />
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Task Name</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setSortOption("title-asc")}>
              A to Z
              {sortOption === "title-asc" && (
                <CheckCircle2 className="ml-auto h-4 w-4" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption("title-desc")}>
              Z to A
              {sortOption === "title-desc" && (
                <CheckCircle2 className="ml-auto h-4 w-4" />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* List Content: Accordion Wrappers */}
      <ScrollArea className="flex-1 -mx-4 px-4">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
            <p>No tasks found.</p>
          </div>
        ) : (
          <Accordion
            type="multiple"
            defaultValue={defaultOpenGroups}
            className="space-y-6 pb-10"
          >
            {TASK_STATUS.map((status) => {
              const groupTasks = groupedTasks[status.value] || [];

              if (groupTasks.length === 0) return null; // Hide empty groups

              return (
                <AccordionItem
                  key={status.value}
                  value={status.value}
                  className="border-none"
                >
                  <AccordionTrigger className="hover:no-underline py-2 mb-2 rounded-md hover:bg-muted/50 px-2 transition-colors">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(status.value)}
                      <span className="font-semibold text-lg">
                        {status.label}
                      </span>
                      <Badge
                        variant="secondary"
                        className="ml-2 rounded-full px-2.5"
                      >
                        {groupTasks.length}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-0 pb-2">
                    <div className="space-y-2">
                      {groupTasks.map((task) => (
                        <TaskListItem
                          key={task.id}
                          task={task}
                          setModalState={setModalState}
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </ScrollArea>
    </div>
  );
};

// Sub-component for individual Task Row
const TaskListItem = ({
  task,
  setModalState,
}: {
  task: Task;
  setModalState: (data: ModalState) => void;
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const isOverflow = useIsOverflow(textRef);

  return (
    <div
      className="group flex items-center justify-between p-3 px-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-pointer"
      onClick={() => setModalState({ type: "edit-task", data: task })}
    >
      {/* Left side: Icons and Title */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Indicators for description/cover */}
        <div className="flex items-center gap-1.5 text-muted-foreground w-10 shrink-0">
          {task.cover && (
            <div
              title={
                task.cover.type === "image" ? "Cover Image" : "Cover Color"
              }
            >
              {task.cover.type === "image" ? (
                <ImageIcon className="h-4 w-4" />
              ) : (
                <Palette className="h-4 w-4" />
              )}
            </div>
          )}
          {task.description && (
            <div title="Has description">
              <AlignLeft className="h-4 w-4" />
            </div>
          )}
        </div>

        {/* Task Title with Tooltip if overflows */}
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              ref={textRef}
              className="truncate font-medium text-sm md:text-base"
            >
              {task.title}
            </span>
          </TooltipTrigger>
          {isOverflow && (
            <TooltipContent side="top">
              <p>{task.title}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </div>

      {/* Right side: Due Date and Actions */}
      <div className="flex items-center gap-4 shrink-0 pl-4">
        {task.dueDate && (
          <div className="flex items-center text-sm text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-md">
            <CalendarIcon className="mr-2 h-3.5 w-3.5" />
            {formatDueDate(task.dueDate)}
          </div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 data-[state=open]:opacity-100"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setModalState({ type: "edit-task", data: task });
              }}
            >
              <Pencil className="mr-2 h-4 w-4" /> Edit Task
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Delete Task:", task.id);
                // Execute delete logic here
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default BoardListView;
