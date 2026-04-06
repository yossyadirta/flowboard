import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDueDate(
  date?: Date | string | number,
  includeTime: boolean = false,
) {
  if (!date) return "";

  const d = new Date(date);

  if (isNaN(d.getTime())) return "";

  return d
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      ...(includeTime && {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    })
    .replace(",", "");
}
