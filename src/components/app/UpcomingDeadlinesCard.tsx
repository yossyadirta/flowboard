import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Board } from "@/types/board";
import { Task } from "@/types/task";

interface UpcomingDeadlinesCardProps {
  hasUpcomingTasks: boolean;
  upcomingTasks: Task[];
  boards: Board[];
  getBoardName: (id: string) => string;
}

export function UpcomingDeadlinesCard({
  hasUpcomingTasks,
  upcomingTasks,
  boards,
  getBoardName,
}: UpcomingDeadlinesCardProps) {
  const router = useRouter();

  return (
    <Card className="flex flex-col shadow-sm border-slate-200/60 dark:border-slate-800 bg-gradient-linear-to-b from-transparent to-slate-50/30 dark:to-slate-900/30 xl:flex-1 xl:min-h-0 py-2 gap-4">
      <CardHeader className="shrink-0 p-4 pl-8">
        <CardTitle className="text-base md:text-lg flex items-center gap-2">
          <Clock className="h-4 w-4 md:h-5 md:w-5 text-rose-500" />
          Upcoming Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 xl:min-h-0">
        {!hasUpcomingTasks ? (
          <div className="flex items-center justify-center h-full py-10">
            <p className="text-sm text-center text-muted-foreground">
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
  );
}
