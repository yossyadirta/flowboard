import { Variants } from "framer-motion";
import {
  SquareKanban,
  List,
  BarChart3,
  Shield,
} from "lucide-react";

export const HERO_WORDS = "Manage Your Projects Flow, Effortlessly.".split(" ");

export const DEMO_TASKS = [
  {
    id: "t1",
    key: "FB-1",
    title: "Design system components",
    status: "done" as const,
    dueDate: "Jun 3",
    description: "Build reusable UI primitives",
    cover: { type: "color" as const, value: "#8B5CF6" },
  },
  {
    id: "t2",
    key: "FB-2",
    title: "Implement drag & drop",
    status: "done" as const,
    dueDate: "Jun 5",
    description: "",
    cover: { type: "color" as const, value: "#10B981" },
  },
  {
    id: "t3",
    key: "FB-3",
    title: "Setup localStorage persistence",
    status: "in-progress" as const,
    dueDate: "Jun 8",
    description: "Implement state hydration from localStorage",
    cover: null,
  },
  {
    id: "t4",
    key: "FB-4",
    title: "Build list view layout",
    status: "in-progress" as const,
    dueDate: "Jun 10",
    description: "",
    cover: { type: "color" as const, value: "#3B82F6" },
  },
  {
    id: "t5",
    key: "FB-5",
    title: "Add table view with sorting",
    status: "todo" as const,
    dueDate: "Jun 12",
    description: "Use tanstack/react-table",
    cover: null,
  },

];

export const FEATURES = [
  {
    icon: SquareKanban,
    title: "Intuitive Kanban Board",
    description:
      "Drag-and-drop tasks flawlessly across columns. Visual workflow management at its finest.",
    size: "large" as const,
  },
  {
    icon: List,
    title: "Powerful List View",
    description:
      "High-precision data sorting with accordion-grouped statuses and instant task filters.",
    size: "large" as const,
  },
  {
    icon: BarChart3,
    title: "Workspace Metrics",
    description:
      "Visual indicators tracking your real-time project progress across all boards.",
    size: "small" as const,
  },
  {
    icon: Shield,
    title: "100% Local Privacy",
    description: "Zero servers, zero trackers, absolute local latency.",
    size: "small" as const,
  },
];

export const TECH_NODES = [
  { label: "User Click", x: 80, y: 100 },
  { label: "Custom Hooks", x: 350, y: 100 },
  { label: "State Manager", x: 620, y: 100 },
  { label: "LocalStorage", x: 890, y: 100 },
];

export const wordVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const getStatusLabel = (status: string) => {
  switch (status) {
    case "done":
      return "Done";
    case "in-progress":
      return "Doing";
    default:
      return "To do";
  }
};

export const getStatusConfig = (status: string) => {
  switch (status) {
    case "done":
      return {
        color: "text-emerald-500",
        bg: "bg-emerald-500/5",
        border: "border-emerald-500/20",
        badgeClass:
          "bg-emerald-700/15 text-emerald-700 dark:text-emerald-400",
      };
    case "in-progress":
      return {
        color: "text-blue-500",
        bg: "bg-blue-500/5",
        border: "border-blue-500/20",
        badgeClass: "bg-blue-700/15 text-blue-700 dark:text-blue-400",
      };
    default:
      return {
        color: "text-slate-400",
        bg: "bg-slate-500/5",
        border: "border-slate-500/20",
        badgeClass: "bg-slate-700/15 text-slate-700 dark:text-slate-300",
      };
  }
};
