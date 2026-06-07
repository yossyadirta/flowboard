import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useTransform } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Clipboard,
  SearchIcon,
  Star,
  SquareKanban,
  List,
  Table2,
  PlusIcon,
  Clock,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { HERO_WORDS, DEMO_TASKS, wordVariants, fadeUp } from "./constants";
import { Section } from "./Section";

export const HeroSection = () => {
  const { mouseX, mouseY } = useMouseParallax();

  const orb1X = useTransform(mouseX, [-0.5, 0.5], [-40, 40]);
  const orb1Y = useTransform(mouseY, [-0.5, 0.5], [-30, 30]);
  const orb2X = useTransform(mouseX, [-0.5, 0.5], [30, -30]);
  const orb2Y = useTransform(mouseY, [-0.5, 0.5], [20, -20]);
  const orb3X = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const orb3Y = useTransform(mouseY, [-0.5, 0.5], [-40, 40]);

  return (
    <Section className="relative min-h-screen pt-32">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          style={{ x: orb1X, y: orb1Y }}
          className="absolute -top-20 -left-20 size-[500px] rounded-full bg-primary/10 blur-[120px]"
        />
        <motion.div
          style={{ x: orb2X, y: orb2Y }}
          className="absolute top-1/3 -right-32 size-[400px] rounded-full bg-primary/10 blur-[100px]"
        />
        <motion.div
          style={{ x: orb3X, y: orb3Y }}
          className="absolute -bottom-20 left-1/3 size-[350px] rounded-full bg-primary/10 blur-[80px]"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="mt-12 mb-6 flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-1 text-5xl leading-tight font-bold tracking-tight md:text-6xl lg:text-7xl">
          {HERO_WORDS.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className={
                word === "Flow,"
                  ? "text-primary"
                  : ""
              }
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          A lightning-fast, sleek productivity board inspired by Linear. No
          heavy database setups—100% private and secured right in your Local
          Storage.
        </motion.p>

        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <Button
            asChild
            size="lg"
            className="gap-2 px-8 text-sm shadow-lg shadow-primary/20"
          >
            <Link href="/app" target="_blank" rel="noopener noreferrer">
              Get Started
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="relative mt-20 w-full max-w-5xl">
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="rounded-xl border border-border/50 bg-card/60 p-1 shadow-2xl shadow-black/10 backdrop-blur-sm"
          >
            <div className="rounded-lg border border-border/30 bg-card overflow-hidden">
              <div className="flex items-center gap-2 border-b border-border/30 bg-muted/30 px-4 py-2.5">
                <div className="flex gap-1.5">
                  <div className="size-2.5 rounded-full bg-red-400/60" />
                  <div className="size-2.5 rounded-full bg-amber-400/60" />
                  <div className="size-2.5 rounded-full bg-emerald-400/60" />
                </div>
                <div className="ml-4 flex h-6 w-64 items-center rounded-md bg-background/60 px-3">
                  <span className="text-[10px] text-muted-foreground">
                    flowboard.app/app
                  </span>
                </div>
              </div>

              <div className="flex" style={{ height: 340 }}>
                <div className="hidden w-72 shrink-0 border-r border-border/30 bg-secondary/50 md:flex">
                  <div className="flex w-14 shrink-0 flex-col items-center gap-3 border-r border-border/20 py-3">
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Image
                        src="/logo.svg"
                        alt="Flowboard"
                        width={22}
                        height={22}
                      />
                    </motion.div>
                    <div className="flex flex-col items-center gap-2 mt-1">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-background">
                        <Clipboard className="size-4 text-foreground/70" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 p-3 overflow-hidden">
                    <div className="flex h-8 items-center rounded-md bg-background/60 px-2.5 mb-3">
                      <SearchIcon className="size-3.5 text-muted-foreground mr-2" />
                      <span className="text-[11px] text-muted-foreground">
                        Search boards...
                      </span>
                    </div>
                    <div className="text-[10px] text-muted-foreground mb-2 px-1 font-medium">
                      + Add Board
                    </div>
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground/60 mb-2 px-1 mt-3">
                      Favorites
                    </div>
                    {[
                      { emoji: "🚀", name: "Product Launch", active: true },
                      { emoji: "💡", name: "Ideas Backlog", active: false },
                    ].map((b) => (
                      <div
                        key={b.name}
                        className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] mb-0.5 ${b.active
                          ? "bg-background font-medium"
                          : "text-muted-foreground"
                          }`}
                      >
                        <span>{b.emoji}</span>
                        <span className="truncate">{b.name}</span>
                      </div>
                    ))}
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground/60 mb-2 px-1 mt-3">
                      All Boards
                    </div>
                    {[
                      { emoji: "📈", name: "Marketing Q3" },
                      { emoji: "⚙️", name: "Infrastructure" },
                      { emoji: "📚", name: "Knowledge Base" },
                    ].map((b) => (
                      <div
                        key={b.name}
                        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] text-muted-foreground mb-0.5"
                      >
                        <span>{b.emoji}</span>
                        <span className="truncate">{b.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-1 overflow-hidden p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-md bg-secondary text-sm">
                        🚀
                      </div>
                      <span className="text-sm font-bold">Product Launch</span>
                      <Star className="size-3.5 text-amber-400 fill-amber-400" />
                    </div>
                  </div>

                  <div className="flex items-center gap-1 border-b border-border/30 mb-3 pb-2">
                    <div className="flex items-center gap-1.5 text-primary text-[11px] font-medium px-2 py-1 border-b-2 border-primary">
                      <SquareKanban className="size-3.5" />
                      Kanban
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] px-2 py-1">
                      <List className="size-3.5" />
                      List
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] px-2 py-1">
                      <Table2 className="size-3.5" />
                      Table
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 h-[calc(100%-80px)]">
                    {(
                      [
                        { status: "todo", label: "To do" },
                        { status: "in-progress", label: "Doing" },
                        { status: "done", label: "Done" },
                      ] as const
                    ).map((col, colIdx) => {
                      const tasks = DEMO_TASKS.filter(
                        (t) => t.status === col.status
                      );
                      return (
                        <div
                          key={col.status}
                          className="rounded-lg bg-secondary/60 p-2 flex flex-col overflow-hidden"
                        >
                          <div className="flex items-center justify-between px-1 mb-2">
                            <span className="text-[11px] font-medium">
                              {col.label}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              {tasks.length}
                            </span>
                          </div>
                          <div className="flex-1 flex flex-col gap-1.5 overflow-hidden">
                            {tasks.map((task, taskIdx) => (
                              <motion.div
                                key={task.id}
                                animate={{ y: [0, -4 - taskIdx, 0] }}
                                transition={{
                                  duration: 3 + colIdx * 0.5,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                  delay: colIdx * 0.7 + taskIdx * 0.3,
                                }}
                              >
                                <Card className="border-0 bg-card shadow-sm rounded-lg py-0 gap-0 overflow-hidden">
                                  {task.cover && (
                                    <div
                                      className="w-full h-3"
                                      style={{
                                        backgroundColor: task.cover.value,
                                      }}
                                    />
                                  )}
                                  <div className="p-2.5 pt-2">
                                    <CardHeader className="p-0 gap-0">
                                      <CardTitle className="text-[11px] font-medium leading-tight truncate">
                                        {task.title}
                                      </CardTitle>
                                    </CardHeader>
                                    {task.dueDate && (
                                      <CardDescription className="text-[9px] flex items-center gap-1 mt-1.5">
                                        <Clock className="size-2.5" />
                                        {task.dueDate}
                                      </CardDescription>
                                    )}
                                  </div>
                                </Card>
                              </motion.div>
                            ))}
                            <div className="flex items-center gap-1 text-[10px] text-muted-foreground/60 px-1 mt-auto pt-1">
                              <PlusIcon className="size-3" />
                              Add New Task
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -12, 0], rotate: [1, 2, 1] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-4 -bottom-6 hidden rounded-lg border border-border/50 bg-card/80 p-3 shadow-xl backdrop-blur-sm md:block"
          >
            <div className="flex items-center gap-2 text-xs">
              <BarChart3 className="size-4 text-primary" />
              <span className="font-medium">Progress</span>
            </div>
            <div className="mt-2 flex gap-1">
              {[60, 80, 45, 90, 70].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: h * 0.3 }}
                  transition={{
                    delay: 1 + i * 0.1,
                    duration: 0.6,
                    ease: "backOut",
                  }}
                  className="w-3 rounded-sm bg-primary/80"
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0], rotate: [-1, -2, -1] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute -bottom-4 -left-4 hidden rounded-lg border border-border/50 bg-card/80 p-3 shadow-xl backdrop-blur-sm md:block"
          >
            <div className="flex items-center gap-2 text-xs">
              <CheckCircle2 className="size-4 text-primary" />
              <span className="font-medium">2 tasks done</span>
            </div>
            <div className="mt-1.5 h-1.5 w-24 overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "29%" }}
                transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                className="h-full rounded-full bg-primary"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};
