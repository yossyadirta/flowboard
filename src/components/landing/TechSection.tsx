import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Section } from "./Section";
import { CircuitLine } from "./CircuitLine";

export const TechSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const techStack = [
    { name: "Next.js 16", desc: "App Router" },
    { name: "TypeScript", desc: "Strict Mode" },
    { name: "LocalStorage", desc: "Persistence" },
    { name: "dnd-kit", desc: "Drag & Drop" },
  ];

  return (
    <Section id="tech" className="relative">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[150px]" />
      </div>
      <div ref={ref} className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
            Engineered for Modern{" "}
            <span className="text-primary">
              Frontend Workloads.
            </span>
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Built on top of Next.js App Router, TypeScript, and Immutable State
            Management to demonstrate enterprise-grade reliability.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="mb-4 flex flex-wrap items-center justify-center gap-3"
        >
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: 0.4 + i * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-2 backdrop-blur-sm"
            >
              <span className="text-sm font-medium">{tech.name}</span>
              <span className="text-xs text-muted-foreground">
                {tech.desc}
              </span>
            </motion.div>
          ))}
        </motion.div>
        <CircuitLine />
      </div>
    </Section>
  );
};
