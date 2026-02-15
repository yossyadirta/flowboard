import { TaskStatus } from "@/types/task";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date?: Date, includeTime: boolean = false) {
  if (!date) return "";

  return date.toLocaleString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    ...(includeTime && {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  });
}

export function formatDueDate(dueDate?: Date | string, status?: TaskStatus) {
  if (!dueDate) return "";

  if (status === "done") {
    return "Completed";
  }

  const now = new Date();
  const formatDate = new Date(dueDate);

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const target = new Date(
    formatDate.getFullYear(),
    formatDate.getMonth(),
    formatDate.getDate(),
  );

  const diffMs = target.getTime() - today.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays === -1) return "Yesterday";

  if (diffDays > 1 && diffDays < 7) return `In ${diffDays} days`;

  if (diffDays < -1 && diffDays > -7) return `${Math.abs(diffDays)} days ago`;

  if (diffDays >= 7) {
    const weeks = Math.floor(diffDays / 7);
    return `In ${weeks} week${weeks > 1 ? "s" : ""}`;
  }

  if (diffDays <= -7) {
    const weeks = Math.floor(Math.abs(diffDays) / 7);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }

  return "";
}
