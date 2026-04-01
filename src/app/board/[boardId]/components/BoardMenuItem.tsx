"use client";

import React, { useRef, useState } from "react";
import { BOARD_ICONS_MAP } from "@/components/board/BoardIcons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsOverflow } from "@/hooks/useIsOverflow";
import { Board } from "@/types/board";
import Link from "next/link";
import { OptionDropdown } from "@/components/ui/option-dropdown";
import { useBoardActions } from "../hooks/useBoardActions";
import { useBoardDnd } from "../hooks/useBoardDnd";
import { useBoardDerived } from "../hooks/useBoardDerived";
import BoardModals from "./BoardModals";
import { ModalState } from "@/types/state";
import { cn } from "@/lib/utils";

type Props = { item: Board; pathname: string };

const BoardMenuItem = ({ item, pathname }: Props) => {
  const textRef = useRef<HTMLAnchorElement>(null);
  const isOverflow = useIsOverflow(textRef);

  const actions = useBoardActions({ boardId: item.id });
  const dnd = useBoardDnd({ boardId: item.id });
  const derived = useBoardDerived({ boardId: item.id });

  const [modalState, setModalState] = useState<ModalState>({
    type: null,
  });

  const closeModal = () => setModalState({ type: null });

  const href = `/board/${item.id}`;
  const isActive = pathname === href;
  const { emoji } = BOARD_ICONS_MAP[item?.icon ?? "briefcase"];
  const isOpen = modalState.type === "option-board";

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton isActive={isActive}>
          <Avatar className="w-4">
            <AvatarFallback className="bg-transparent text-xs">
              {emoji}
            </AvatarFallback>
          </Avatar>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                ref={textRef}
                href={href}
                className={`flex-1 min-w-0 truncate font-medium ${
                  isActive
                    ? "font-semibold! text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            </TooltipTrigger>

            {isOverflow && (
              <TooltipContent side="right">{item.name}</TooltipContent>
            )}
          </Tooltip>
        </SidebarMenuButton>

        <SidebarMenuAction
          showOnHover={!isOpen}
          className={cn(
            "hover:bg-transparent not-last-of-type:focus:bg-transparent active:bg-transparent focus-visible:ring-0 focus-visible:outline-none data-[state=open]:bg-transparent focus:outline-none outline-none",
            isOpen && "opacity-100 pointer-events-auto",
          )}
          asChild
        >
          <div className="flex items-center">
            <OptionDropdown
              open={modalState.type === "option-board"}
              onOpenChange={() => {
                if (modalState.type === "option-board") {
                  closeModal();
                } else {
                  setModalState({
                    type: "option-board",
                  });
                }
              }}
              onDelete={() => {
                setModalState({
                  type: "delete-board",
                });
              }}
              onUpdate={() => {
                setModalState({
                  type: "edit-board",
                });
              }}
              dropdownAlign="start"
              btnClassName="!bg-transparent border-0 max-h-max max-w-max p-0 focus-visible:ring-0 cursor-pointer"
            />
          </div>
        </SidebarMenuAction>
      </SidebarMenuItem>

      <BoardModals
        modalState={modalState}
        closeModal={closeModal}
        actions={actions}
        dnd={dnd}
        derived={derived}
      />
    </>
  );
};

export default BoardMenuItem;
