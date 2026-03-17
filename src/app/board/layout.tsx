"use client";

import React, { useEffect, useEffectEvent, useState } from "react";
import { useBoards } from "@/hooks/useBoards";
import { useTheme } from "next-themes";
import Image from "next/image";
import { AddBoardModal } from "@/components/board/AddBoardModal";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { Clipboard, SunMoon } from "lucide-react";
import BoardMenuItem from "./[boardId]/components/BoardMenuItem";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const { boards } = useBoards();
  const { theme, setTheme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);
  const [isOpenAddBoardModal, setIsOpenAddBoardModal] = useState(false);

  const handleUpdateMounted = useEffectEvent(() => {
    setIsMounted(true);
  });

  useEffect(() => {
    handleUpdateMounted();
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SidebarProvider>
        <Sidebar
          collapsible="none"
          className="w-[320px] h-screen p-4 bg-background"
        >
          <div className="flex h-full bg-secondary rounded-md">
            {/* RAIL MENU */}
            <div className="flex flex-col justify-between py-2 mr-0">
              <div className="w-16 flex flex-col items-center gap-4">
                <Image src="/logo.svg" alt="Flowboard" width={32} height={32} />
                <button className="p-2 rounded-lg hover:bg-accent flex flex-col align-middle justify-center text-[0.75rem] gap-1.5 font-medium items-center bg-background cursor-pointer">
                  <Clipboard
                    className="flex justify-center items-center text-center text-[0.5rem]"
                    size={21}
                  />
                  Boards
                </button>
              </div>
              <div className="w-16 flex flex-col items-center gap-4">
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-lg hover:bg-accent cursor-pointer"
                >
                  <SunMoon />
                </button>
              </div>
            </div>

            {/* SUB MENU */}
            <div className="flex-1 overflow-y-auto bg-background m-2 rounded-md ml-0">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Boards</SidebarGroupLabel>

                  <SidebarMenu>
                    {boards.map((board) => (
                      <BoardMenuItem
                        key={board.id}
                        item={board}
                        pathname={pathname}
                      />
                    ))}
                    <SidebarMenuButton
                      onClick={() => setIsOpenAddBoardModal(true)}
                      className="cursor-pointer"
                    >
                      <span className="text-muted-foreground font-semibold">
                        + Add Board
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
            </div>
          </div>
        </Sidebar>
        <SidebarInset className="h-screen overflow-auto p-4 flex-1">
          {children}
        </SidebarInset>
      </SidebarProvider>

      <AddBoardModal
        open={isOpenAddBoardModal}
        onClose={() => setIsOpenAddBoardModal(false)}
      />
    </>
  );
}
