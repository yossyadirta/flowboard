import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  children?: React.ReactNode;
}

export function Progress({ value = 0, className, children }: ProgressProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {children}

      <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export function ProgressLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-medium">{children}</div>;
}

export function ProgressValue({ value }: { value: number }) {
  return <div className="text-sm text-muted-foreground">{value}%</div>;
}
