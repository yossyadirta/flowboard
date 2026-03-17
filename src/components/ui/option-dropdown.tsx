"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, PencilIcon, TrashIcon } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: () => void;
  onDelete: () => void;
  onUpdate: () => void;
  btnSize?: "default" | "sm" | "xs";
  btnClassName?: string;
  dropdownAlign?: "start" | "end" | "center";
};

export function OptionDropdown({
  open,
  onOpenChange,
  onDelete,
  onUpdate,
  btnSize,
  btnClassName,
  dropdownAlign = "end",
}: Props) {
  return (
    <div onPointerDown={(e) => e.stopPropagation()}>
      <DropdownMenu open={open} onOpenChange={onOpenChange}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size={btnSize} className={btnClassName}>
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align={dropdownAlign}>
          <DropdownMenuItem
            className="hover:bg-sidebar-accent! hover:text-sidebar-accent-foreground!"
            onClick={onUpdate}
          >
            <PencilIcon />
            Edit
          </DropdownMenuItem>
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive" onClick={onDelete}>
              <TrashIcon />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
