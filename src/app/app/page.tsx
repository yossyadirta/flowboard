"use client";

import React from "react";
import {
  Plus,
  Star,
  Clock,
  CheckCircle2,
  Activity,
  Calendar,
  ClipboardList,
  Coffee,
  BarChart3,
  Layout,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { BOARD_ICONS_MAP, BoardIconId } from "@/components/board/BoardIcons";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { AddBoardModal } from "@/components/board/AddBoardModal";
import { useBoardDashboardData } from "./[boardId]/hooks/useBoardDashboardData";

export default function HomeDashboard() {
  const router = useRouter();

  const {
    boards,
    showFavoritesModal,
    setShowFavoritesModal,
    isOpenAddBoardModal,
    setIsOpenAddBoardModal,
    hasBoards,
    favoriteBoards,
    hasFavorites,
    displayFavorites,
    remainingFavoritesCount,
    upcomingTasks,
    hasUpcomingTasks,
    recentTasks,
    getBoardMetrics,
    getBoardName,
  } = useBoardDashboardData();

  if (!hasBoards) {
    return (
      <>
        <div className="flex flex-col gap-6 w-full min-h-screen xl:h-screen xl:overflow-hidden bg-slate-50/50 dark:bg-background/95 p-5 pl-0 xs:pl-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                Welcome back! 👋
              </h1>
              <p className="text-sm md:text-base text-muted-foreground mt-1">
                Track and manage all your personal projects in one place.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 flex-1 xl:min-h-0 pb-10 xl:pb-4 overflow-y-auto xl:overflow-hidden overflow-x-hidden">
            <div className="xl:col-span-2 flex flex-col gap-8 xl:h-full xl:min-h-0">
              <div className="rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-transparent p-8 md:p-10 flex flex-col items-center justify-center text-center shrink-0">
                <div className="h-10 w-10 md:h-14 md:w-14 bg-slate-100 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-5">
                  <Layout className="h-6 w-6 md:h-6 md:w-6 text-slate-400 dark:text-slate-500" />
                </div>
                <h2 className="text-xl md:text-xl font-bold mb-3 text-foreground">
                  Create Your First Board
                </h2>
                <p className="text-muted-foreground max-w-sm mb-8 text-sm md:text-base">
                  Create your first board to start organizing your projects and
                  tracking your progress.
                </p>
                <Button
                  className="shadow-md hover:shadow-lg transition-all rounded-full px-6 w-full sm:w-auto shrink-0 cursor-pointer"
                  onClick={() => setIsOpenAddBoardModal(true)}
                >
                  <Plus className="h-5 w-5" />
                  New Board
                </Button>
              </div>

              <section className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4 shrink-0">
                  <BarChart3 className="h-5 w-5 text-slate-400" />
                  <h2 className="text-lg md:text-xl font-semibold text-slate-400">
                    Project Status
                  </h2>
                </div>
                <div className="flex-1 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-transparent flex flex-col items-center justify-center p-8 text-center">
                  <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center mb-3">
                    <ClipboardList className="h-6 w-6 text-slate-300 dark:text-slate-600" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your project metrics will appear here once you start
                    working.
                  </p>
                </div>
              </section>
            </div>

            <div className="flex flex-col gap-6 xl:h-full xl:min-h-0">
              <Card className="flex flex-col shadow-none border-dashed border-2 border-slate-200 dark:border-slate-800 bg-transparent xl:flex-1 xl:min-h-0 py-2">
                <CardHeader className="p-4 pl-8">
                  <CardTitle className="text-base md:text-lg flex items-center gap-2 text-slate-400">
                    <Clock className="h-4 w-4 text-slate-400" />
                    Upcoming Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center mb-3">
                    <Clock className="h-5 w-5 text-slate-300 dark:text-slate-600" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    No upcoming deadlines yet.
                  </p>
                </CardContent>
              </Card>

              <Card className="flex flex-col shadow-none border-dashed border-2 border-slate-200 dark:border-slate-800 bg-transparent xl:flex-1 xl:min-h-0 py-2">
                <CardHeader className="p-4 pl-8">
                  <CardTitle className="text-base md:text-lg flex items-center gap-2 text-slate-400">
                    <Activity className="h-4 w-4 text-slate-400" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center mb-3">
                    <Activity className="h-5 w-5 text-slate-300 dark:text-slate-600" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your activity log is currently empty.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>{" "}
        <AddBoardModal
          open={isOpenAddBoardModal}
          onClose={() => setIsOpenAddBoardModal(false)}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6 w-full min-h-screen xl:h-screen xl:overflow-hidden bg-slate-50/50 dark:bg-background/95 p-5 pl-0 xs:pl-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Welcome back! 👋
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              Track and manage all your personal projects in one place.
            </p>
          </div>
          <Button
            className="shadow-md hover:shadow-lg transition-all rounded-full px-6 w-full sm:w-auto shrink-0 cursor-pointer"
            onClick={() => setIsOpenAddBoardModal(true)}
          >
            <Plus className="h-4 w-4 md:h-5 md:w-5" />
            Create New Board
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 flex-1 xl:min-h-0 pb-10 xl:pb-4 overflow-y-auto xl:overflow-hidden overflow-x-hidden">
          <div className="xl:col-span-2 flex flex-col gap-6 xl:h-full xl:min-h-0">
            <section className="shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                  <h2 className="text-lg md:text-xl font-semibold">
                    Favorite Boards
                  </h2>
                </div>
                {remainingFavoritesCount > 0 && (
                  <button
                    onClick={() => setShowFavoritesModal(true)}
                    className="text-xs font-medium text-muted-foreground bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-2 py-1 rounded-md transition-colors"
                  >
                    + {remainingFavoritesCount} others hidden
                  </button>
                )}
              </div>

              {!hasFavorites ? (
                <div className="p-6 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-center bg-transparent">
                  <p className="text-sm text-muted-foreground">
                    No favorite boards yet. Click the{" "}
                    <Star className="inline h-3 w-3 mx-1" /> icon on a board to
                    pin it here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {displayFavorites.map((board) => {
                    const metrics = getBoardMetrics(board.id);
                    const emoji =
                      BOARD_ICONS_MAP[board.icon as BoardIconId]?.emoji || "📋";
                    return (
                      <Card
                        key={board.id}
                        onClick={() => router.push(`/app/${board.key}`)}
                        className="group cursor-pointer hover:shadow-md hover:border-primary/50 transition-all border-t-4 border-t-primary"
                      >
                        <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
                          <div>
                            <CardTitle className="text-base md:text-lg flex items-center gap-2">
                              <span>{emoji}</span>{" "}
                              <span className="truncate max-w-30">
                                {board.name}
                              </span>
                            </CardTitle>
                            <CardDescription className="mt-1 text-xs md:text-sm">
                              Key: {board.key}
                            </CardDescription>
                          </div>
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground mb-2">
                            <span>Progress</span>
                            <span className="font-medium text-foreground">
                              {metrics.progress}%
                            </span>
                          </div>
                          <Progress value={metrics.progress} className="h-2" />
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </section>

            <section className="flex-1 flex flex-col xl:min-h-0 xl:overflow-hidden pt-2">
              <div className="flex items-center gap-2 mb-4 shrink-0">
                <BarChart3 className="h-5 w-5 text-indigo-500" />
                <h2 className="text-lg md:text-xl font-semibold">
                  Project Status
                </h2>
              </div>

              <ScrollArea className="max-h-100 xl:max-h-none xl:h-full pr-4 -mr-4">
                <div className="flex flex-col gap-3 pb-12 md:pb-0 sm:pb-0 xs:pb-0">
                  {boards.map((board) => {
                    const metrics = getBoardMetrics(board.id);
                    const emoji =
                      BOARD_ICONS_MAP[board.icon as BoardIconId]?.emoji || "📋";
                    const isCompleted =
                      metrics.progress === 100 && metrics.done > 0;

                    return (
                      <div
                        key={board.id}
                        onClick={() =>
                          router.push(`/app/${board.key || board.id}`)
                        }
                        className="p-3 md:p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-card hover:border-primary/40 hover:shadow-sm transition-all cursor-pointer flex flex-col gap-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl shrink-0">
                              {emoji}
                            </div>
                            <div>
                              <h3 className="font-medium leading-none mb-1 text-sm md:text-base line-clamp-1">
                                {board.name}
                              </h3>
                              <p className="text-[10px] md:text-xs text-muted-foreground">
                                Key: {board.key}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant="secondary"
                            className={`text-[10px] md:text-xs shrink-0 ${isCompleted ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" : "bg-slate-100 dark:bg-slate-800"}`}
                          >
                            {isCompleted ? "Completed" : "In Progress"}
                          </Badge>
                        </div>
                        <div>
                          <div className="flex justify-between text-[10px] md:text-xs text-muted-foreground mb-2">
                            <span className="font-medium text-foreground">
                              {metrics.progress}%
                            </span>
                            <span>
                              {metrics.done} /{" "}
                              {metrics.done + metrics.remaining} Tasks
                            </span>
                          </div>
                          <Progress
                            value={metrics.progress}
                            className={`h-1.5 md:h-2 ${isCompleted ? "[&>div]:bg-emerald-500" : ""}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </section>
          </div>

          <div className="flex flex-col gap-6 xl:h-full xl:min-h-0">
            <Card className="flex flex-col shadow-sm border-slate-200/60 dark:border-slate-800 xl:flex-1 xl:min-h-0 py-2 gap-4">
              <CardHeader className="border-b border-slate-100 dark:border-slate-800 shrink-0 p-4 pl-8 [.border-b]:pb-4">
                <CardTitle className="text-base md:text-lg flex items-center gap-2">
                  <Clock className="h-4 w-4 md:h-5 md:w-5 text-rose-500" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 p-0 xl:min-h-0">
                {!hasUpcomingTasks ? (
                  <div className="flex flex-col items-center justify-center h-full py-10 px-4 text-center">
                    <Coffee className="h-8 w-8 md:h-10 md:w-10 text-slate-300 mb-3" />
                    <p className="text-sm font-medium text-foreground">
                      You&apos;re all caught up!
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      No tasks with approaching deadlines.
                    </p>
                  </div>
                ) : (
                  <ScrollArea className="h-62.5 xl:h-full">
                    <div className="flex flex-col">
                      {upcomingTasks.map((task) => (
                        <div
                          key={task.id}
                          onClick={() =>
                            router.push(
                              `/app/${boards.find((b) => b.id === task.boardId)?.key || task.boardId}`,
                            )
                          }
                          className="flex flex-col gap-1 p-4 border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-start justify-between">
                            <span className="font-medium text-xs md:text-sm group-hover:text-primary transition-colors truncate max-w-37.5 md:max-w-45">
                              {task.title}
                            </span>
                            <Badge
                              variant="outline"
                              className="text-[9px] md:text-[10px] whitespace-nowrap"
                            >
                              {format(new Date(task.dueDate!), "MMM dd")}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] md:text-xs text-muted-foreground mt-1">
                            <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1 rounded truncate max-w-12.5 md:max-w-15">
                              {task.key}
                            </span>
                            <span>•</span>
                            <span className="truncate">
                              {getBoardName(task.boardId)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>

            <Card className="flex flex-col shadow-sm border-slate-200/60 dark:border-slate-800 bg-gradient-linear-to-b from-transparent to-slate-50/30 dark:to-slate-900/30 xl:flex-1 xl:min-h-0 py-2 gap-4">
              <CardHeader className="shrink-0 p-4 pl-8">
                <CardTitle className="text-base md:text-lg flex items-center gap-2">
                  <Activity className="h-4 w-4 md:h-5 md:w-5 text-blue-500" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 p-0 xl:min-h-0">
                {recentTasks.length === 0 ? (
                  <div className="flex items-center justify-center h-full py-10">
                    <p className="text-sm text-center text-muted-foreground">
                      No recent activity.
                    </p>
                  </div>
                ) : (
                  <ScrollArea className="h-75 xl:h-full px-4 md:px-6 pb-6">
                    <div className="space-y-5 relative before:absolute before:inset-0 before:ml-4 md:before:ml-4 before:-translate-x-px md:before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-linear-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-800 before:to-transparent mt-2">
                      {recentTasks.map((task) => (
                        <div
                          key={`act-${task.id}`}
                          className="relative flex items-center justify-normal group is-active"
                        >
                          <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-background bg-blue-100 text-blue-500 shadow shrink-0 z-10">
                            {task.status === "done" ? (
                              <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 text-emerald-500" />
                            ) : (
                              <Plus className="h-3 w-3 md:h-4 md:w-4" />
                            )}
                          </div>
                          <div className="w-[calc(100%-2.5rem)] md:w-[calc(100%-3rem)] p-2.5 md:p-3 rounded-lg border bg-card shadow-sm ml-3 md:ml-4">
                            <p className="text-xs md:text-sm text-foreground line-clamp-2 leading-relaxed">
                              {task.status === "done" ? "Completed" : "Created"}{" "}
                              task{" "}
                              <span className="font-medium">{task.title}</span>
                            </p>
                            <time className="text-[10px] md:text-xs text-muted-foreground flex items-center mt-1.5">
                              <Calendar className="h-3 w-3 mr-1" />
                              {format(new Date(task.createdAt), "MMM dd, yyyy")}
                            </time>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Dialog open={showFavoritesModal} onOpenChange={setShowFavoritesModal}>
        <DialogContent className="sm:max-w-150 w-[95%] max-h-[90vh] flex flex-col p-4 md:p-6 rounded-xl">
          <DialogHeader className="shrink-0">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
              All Favorite Boards
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 pr-3 mt-4 -mr-3">
            <div className="flex flex-col gap-3 pb-4">
              {favoriteBoards.map((board) => {
                const metrics = getBoardMetrics(board.id);
                const emoji =
                  BOARD_ICONS_MAP[board.icon as BoardIconId]?.emoji || "📋";
                return (
                  <div
                    key={`modal-${board.id}`}
                    onClick={() => {
                      setShowFavoritesModal(false);
                      router.push(`/app/${board.key}`);
                    }}
                    className="p-3 md:p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-card hover:border-primary/40 hover:shadow-sm transition-all cursor-pointer flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{emoji}</span>
                        <div>
                          <h3 className="font-medium text-sm md:text-base leading-none mb-1">
                            {board.name}
                          </h3>
                          <p className="text-[10px] md:text-xs text-muted-foreground">
                            Key: {board.key}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-medium text-xs md:text-sm text-foreground">
                          {metrics.progress}%
                        </span>
                      </div>
                    </div>
                    <Progress value={metrics.progress} className="h-1.5 mt-1" />
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      <AddBoardModal
        open={isOpenAddBoardModal}
        onClose={() => setIsOpenAddBoardModal(false)}
      />
    </>
  );
}
