import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Props = {
  derived: {
    taskProgress: number;
    formatProgressColor: (percent: number) => string;
    totalTask: number;
    totalTodoTask: number;
    totalDoneTask: number;
    totalInprogressTask: number;
  };
};

const BoardCompletion = ({ derived }: Props) => {
  return (
    <div className="w-1/4 flex flex-col gap-4">
      <h3 className="font-bold text-2xl tracking-tight text-balance">
        Completion
      </h3>
      <Card>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Board Completion</span>
            <span>{derived.taskProgress}%</span>
          </div>
          <Progress
            value={derived.taskProgress}
            progressColor={derived.formatProgressColor(derived.taskProgress)}
          />
        </div>
        <p>
          {derived.totalTask - derived.totalDoneTask} of {derived.totalTask}{" "}
          tasks completed
        </p>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-red-500">To do</span>
            <span>{derived.totalTodoTask}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-yellow-500">In Progress</span>
            <span>{derived.totalInprogressTask}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-green-500">Done</span>
            <span>{derived.totalDoneTask}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BoardCompletion;
