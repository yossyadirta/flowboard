"use client";

import React, { useRef } from "react";
import { BOARD_ICONS_MAP } from "@/components/board/BoardIcons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsOverflow } from "@/hooks/useIsOverflow";
import { Board } from "@/types/board";
import Link from "next/link";

type Props = { item: Board; pathname: string };

const BoardMenuItem = ({ item, pathname }: Props) => {
  const textRef = useRef<HTMLAnchorElement>(null);
  const isOverflow = useIsOverflow(textRef);

  const href = `/board/${item.id}`;
  const isActive = pathname === href;
  const { emoji } = BOARD_ICONS_MAP[item?.icon ?? "briefcase"];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <SidebarMenuItem>
          <SidebarMenuButton isActive={isActive}>
            <Avatar className="w-4">
              <AvatarFallback className="bg-transparent">
                {emoji}
              </AvatarFallback>
            </Avatar>

            <Link
              ref={textRef}
              href={href}
              className={`flex-1 min-w-0 truncate font-semibold ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </TooltipTrigger>

      {isOverflow && <TooltipContent side="right">{item.name}</TooltipContent>}
    </Tooltip>
  );
};

export default BoardMenuItem;
