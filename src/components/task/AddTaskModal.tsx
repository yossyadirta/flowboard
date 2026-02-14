"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskForm } from "./TaskForm";
import { useTasks } from "@/hooks/useTasks";
import { useState } from "react";
import { TaskStatus } from "@/types/task";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";

type Props = {
  open: boolean;
  onClose: () => void;
  status?: TaskStatus | undefined;
  boardId: string;
};

export function AddTaskModal({ open, onClose, status, boardId }: Props) {
  const { addTask } = useTasks();

  const [canSubmit, setCanSubmit] = useState(false);

  const handleSubmit = ({
    title,
    status,
    dueDate,
  }: {
    title: string;
    status: TaskStatus;
    dueDate: Date;
  }) => {
    addTask(boardId, title, status, dueDate);
    onClose();
    toast.success("Task has been created", {
      description: formatDate(new Date(), true),
      position: "top-center",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>
        <TaskForm
          onSubmit={handleSubmit}
          onValidityChange={setCanSubmit}
          defaultValues={{
            status,
          }}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form="board-form" disabled={!canSubmit}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
