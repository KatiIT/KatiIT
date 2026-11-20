"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMotionScale } from "@/lib/use-reduced-motion";

/**
 * 3D-Scroll: Der Inhalt kippt beim Einscrollen aus der Tiefe (rotateX + translateZ) in die Ebene.
 * Die Mindest-Deckkraft hält den Inhalt auch ohne JavaScript lesbar.
 */
export function Depth({ children, className = "", tilt = 18, depth = 140 }: { children: ReactNode; className?: string; tilt?: number; depth?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const k = useMotionScale();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 96%", "start 58%"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [tilt * k, 0]);
  const z = useTransform(scrollYProgress, [0, 1], [-depth * k, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0.15, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [1 - 0.06 * k, 1]);

  return (
    <div ref={ref} className={className} style={{ perspective: 1400 }}>
      <motion.div style={{ rotateX, z, scale, opacity, transformOrigin: "50% 100%" }} className="h-full">
        {children}
      </motion.div>
    </div>
  );
}
