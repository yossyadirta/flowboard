import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FEATURES, staggerContainer, scaleIn } from "./constants";
import { Section } from "./Section";
import { TiltCard } from "./TiltCard";

export const FeaturesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section id="features">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
            Everything you need.{" "}
            <span className="text-primary">
              Nothing you don&apos;t.
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-4 md:grid-cols-4"
        >
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={scaleIn}
                className="md:col-span-2"
              >
                <TiltCard className="h-full">
                  <div
                    className="group relative h-full overflow-hidden rounded-xl border border-border/50 bg-card p-6 transition-all hover:shadow-lg hover:shadow-black/5 hover:border-primary/50"
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="absolute -top-20 -right-20 size-40 rounded-full bg-primary/10 blur-3xl" />
                    </div>
                    <div className="relative z-10">
                      <div
                        className="mb-4 inline-flex rounded-lg border border-border/50 bg-background/50 p-2.5 backdrop-blur-sm group-hover:border-primary/30 group-hover:text-primary transition-colors"
                      >
                        <Icon className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>

                    {i === 0 && (
                      <div className="absolute right-4 bottom-4 flex gap-1.5 opacity-30">
                        {["To do", "Doing", "Done"].map((col) => (
                          <div
                            key={col}
                            className="w-12 rounded bg-foreground/10 p-1"
                          >
                            <div className="mb-1 h-1 w-full rounded bg-foreground/20" />
                            <div className="h-6 rounded bg-foreground/10" />
                            <div className="mt-1 h-4 rounded bg-foreground/10" />
                          </div>
                        ))}
                      </div>
                    )}
                    {i === 1 && (
                      <div className="absolute right-4 bottom-4 w-32 opacity-30">
                        {[1, 2, 3].map((row) => (
                          <div key={row} className="mb-1 flex gap-2">
                            <div className="h-2 w-2 rounded-full bg-foreground/20" />
                            <div className="h-2 flex-1 rounded bg-foreground/10" />
                            <div className="h-2 w-6 rounded bg-foreground/15" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
};
