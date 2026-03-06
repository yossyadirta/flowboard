"use client";

import React, { useEffect, useEffectEvent, useState } from "react";
import { useBoards } from "@/hooks/useBoards";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { AddBoardModal } from "@/components/board/AddBoardModal";

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BOARD_ICONS_MAP } from "@/components/board/BoardIcons";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { boards } = useBoards();
  const { setTheme } = useTheme();
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
        <Sidebar collapsible="offcanvas">
          <SidebarHeader className="flex justify-between py-4 px-5">
            <div className="flex items-center gap-0.5">
              <Image src="/logo.svg" alt="Flow Board" width={32} height={32} />
              <span className="font-bold text-2xl">Flowboard</span>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {boards.map((item) => {
                  console.log(item);
                  const href = `/board/${item.id}`;
                  const isActive = pathname === href;
                  const { emoji } = BOARD_ICONS_MAP[item?.icon ?? "briefcase"];

                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton isActive={isActive}>
                        <Avatar className="w-4 transition-colors">
                          <AvatarFallback className="bg-transparent">
                            {emoji}
                          </AvatarFallback>
                        </Avatar>
                        <Link
                          href={href}
                          className={`${
                            isActive
                              ? "text-foreground"
                              : "text-muted-foreground"
                          } font-semibold`}
                        >
                          {item.name}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setIsOpenAddBoardModal(true)}
                    className="cursor-pointer"
                  >
                    <span className="text-muted-foreground font-semibold">
                      + Add Board
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <div className="flex justify-between px-4 py-3">
              <button onClick={() => setTheme("light")}>Light</button>
              <button onClick={() => setTheme("dark")}>Dark</button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="md:hidden sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background border-b border-border">
            <div className="flex items-center gap-0.5">
              <Image src="/logo.svg" alt="Flow Board" width={32} height={32} />
              <span className="font-bold text-xl">Flowboard</span>
            </div>

            <SidebarTrigger />
          </header>
          <main className="min-h-screen bg-secondary m-4 rounded-lg p-6">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>

      <AddBoardModal
        open={isOpenAddBoardModal}
        onClose={() => setIsOpenAddBoardModal(false)}
      />
    </>
  );
}
