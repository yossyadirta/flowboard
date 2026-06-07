import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TECH_NODES } from "./constants";

export const CircuitLine = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const pathData = `M ${TECH_NODES[0].x + 60} ${TECH_NODES[0].y} L ${TECH_NODES[1].x - 40} ${TECH_NODES[1].y} M ${TECH_NODES[1].x + 60} ${TECH_NODES[1].y} L ${TECH_NODES[2].x - 40} ${TECH_NODES[2].y} M ${TECH_NODES[2].x + 60} ${TECH_NODES[2].y} L ${TECH_NODES[3].x - 40} ${TECH_NODES[3].y}`;

  return (
    <div
      ref={ref}
      className="relative mx-auto mt-16 w-full max-w-4xl overflow-hidden"
    >
      <svg viewBox="0 0 970 200" className="w-full" fill="none">
        <path
          d={pathData}
          stroke="currentColor"
          strokeWidth="2"
          className="text-border/30"
        />
        <motion.path
          d={pathData}
          stroke="url(#circuitGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient
            id="circuitGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {isInView && (
          <motion.circle
            r="4"
            fill="#8b5cf6"
            filter="url(#glow)"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{
              offsetPath: `path("${pathData}")`,
            }}
          />
        )}
        {TECH_NODES.map((node, i) => (
          <g key={node.label}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-border"
              initial={{ scale: 0, opacity: 0 }}
              animate={
                isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
              }
              transition={{
                delay: i * 0.3 + 0.2,
                duration: 0.4,
                ease: "backOut",
              }}
            />
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="28"
              fill="currentColor"
              className="text-card"
              initial={{ scale: 0, opacity: 0 }}
              animate={
                isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
              }
              transition={{
                delay: i * 0.3 + 0.2,
                duration: 0.4,
                ease: "backOut",
              }}
            />
            <motion.text
              x={node.x}
              y={node.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground text-[10px] font-medium"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: i * 0.3 + 0.5, duration: 0.3 }}
            >
              {node.label}
            </motion.text>
            <motion.text
              x={node.x}
              y={node.y + 50}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground text-[9px]"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: i * 0.3 + 0.6, duration: 0.3 }}
            >
              {["Event", "Logic", "Immutable State", "Persistence"][i]}
            </motion.text>
          </g>
        ))}
      </svg>
    </div>
  );
};
