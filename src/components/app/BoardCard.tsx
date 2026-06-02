import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BOARD_ICONS_MAP,
  BoardIconId,
} from "@/components/app/board/BoardIcons";
import { cn } from "@/lib/utils";
import { Board } from "@/types/board";

type BoardCardProps = {
  board: Board;
  metrics: { progress: number; done: number; remaining: number };
  variant?: "default" | "favorite";
  onClick: () => void;
};

export const BoardCard = ({
  board,
  metrics,
  variant = "default",
  onClick,
}: BoardCardProps) => {
  const emoji = BOARD_ICONS_MAP[board.icon as BoardIconId]?.emoji || "📋";
  const isFavorite = variant === "favorite";

  return (
    <Card
      onClick={onClick}
      className={cn(
        "group cursor-pointer hover:shadow-md transition-all flex flex-col gap-3 p-3 md:p-4 rounded-xl border bg-card hover:border-primary/40",
        isFavorite
          ? "border-t-4 border-t-primary"
          : "border-slate-200/60 dark:border-slate-800",
      )}
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl">{emoji}</span>
        <h3 className="font-semibold text-base truncate">{board.name}</h3>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Key: {board.key}</span>
        {isFavorite && <span>{metrics.done + metrics.remaining} Tasks</span>}
      </div>

      <div className="space-y-1.5 mt-auto pt-2">
        <div className="flex items-center justify-between text-xs font-medium">
          <span>Progress</span>
          <span>{metrics.progress}%</span>
        </div>
        <Progress value={metrics.progress} className="h-1.5 md:h-2" />

        {isFavorite ? (
          <div className="flex items-center justify-between mt-2">
            <Badge
              variant="secondary"
              className="font-normal text-[10px] md:text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            >
              {metrics.done} Done
            </Badge>
            <Badge
              variant="secondary"
              className="font-normal text-[10px] md:text-xs bg-slate-100 dark:bg-slate-800"
            >
              {metrics.remaining} Remaining
            </Badge>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground mt-2">
            {metrics.remaining} Active Tasks
          </p>
        )}
      </div>
    </Card>
  );
};
