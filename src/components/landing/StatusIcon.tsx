import React from "react";
import { CheckCircle2, Timer, Circle } from "lucide-react";

interface StatusIconProps {
  status: string;
}

export const StatusIcon = ({ status }: StatusIconProps) => {
  switch (status) {
    case "done":
      return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
    case "in-progress":
      return <Timer className="h-4 w-4 text-blue-500" />;
    default:
      return <Circle className="h-4 w-4 text-slate-400" />;
  }
};
