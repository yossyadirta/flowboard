import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full h-full overflow-hidden bg-slate-50/50 dark:bg-background/95 p-4 md:p-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-10 w-full sm:w-40 rounded-full" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 flex-1 xl:min-h-0 pb-10 xl:pb-4">
        <div className="xl:col-span-2 flex flex-col gap-6 xl:h-full xl:min-h-0">
          <section className="shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-6 w-32" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-t-4 border-t-primary/20">
                  <CardHeader className="pb-3">
                    <Skeleton className="h-6 w-3/4 mb-1" />
                    <Skeleton className="h-3 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-2">
                      <Skeleton className="h-3 w-12" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="flex-1 flex flex-col xl:min-h-0 pt-2">
            <div className="flex items-center gap-2 mb-4 shrink-0">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-3 md:p-4 rounded-xl border bg-card flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-lg" />
                      <div>
                        <Skeleton className="h-4 w-32 mb-1.5" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <Skeleton className="h-3 w-8" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-1.5 md:h-2 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-6 xl:h-full xl:min-h-0">
          <Card className="flex flex-col xl:flex-1 py-2 gap-4">
            <CardHeader className="shrink-0 p-4 pl-8">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-5 w-40" />
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 px-4">
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col gap-2 py-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-12 rounded-full" />
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-3 w-12 rounded" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="flex flex-col xl:flex-1 py-2 gap-4">
            <CardHeader className="shrink-0 p-4 pl-8">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-5 w-32" />
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 px-6 pb-6">
              <div className="space-y-5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3 md:gap-4">
                    <Skeleton className="h-6 w-6 md:h-8 md:w-8 rounded-full shrink-0" />
                    <div className="flex-1 p-2.5 md:p-3 rounded-lg border bg-card">
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
