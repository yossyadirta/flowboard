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
import { Moon, Sun } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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
                {boards.map((item) => (
                  <BoardMenuItem
                    key={item.id}
                    item={item}
                    pathname={pathname}
                  />
                ))}

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

          <SidebarFooter className="pb-4">
            <ToggleGroup
              type="single"
              value={theme}
              onValueChange={(value) => value && setTheme(value)}
              className="bg-muted rounded-lg w-full flex p-1.5"
              spacing={1}
            >
              <ToggleGroupItem
                value="light"
                className="
                  flex-1 rounded-lg
                  data-[state=on]:bg-background
                  data-[state=on]:text-foreground
                "
              >
                <Sun className="h-4 w-4 mr-1" />
                Light
              </ToggleGroupItem>

              <ToggleGroupItem
                value="dark"
                className="
                  flex-1 rounded-lg
                  data-[state=on]:bg-background
                  data-[state=on]:text-foreground
                "
              >
                <Moon className="h-4 w-4 mr-1" />
                Dark
              </ToggleGroupItem>
            </ToggleGroup>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex flex-col min-h-screen">
          <header className="md:hidden sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background border-b border-border">
            <div className="flex items-center gap-0.5">
              <Image src="/logo.svg" alt="Flow Board" width={32} height={32} />
              <span className="font-bold text-xl">Flowboard</span>
            </div>

            <SidebarTrigger />
          </header>
          <main className="flex-1 bg-secondary m-4 rounded-lg p-6 ml-1">
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
