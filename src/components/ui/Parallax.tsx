"use client";
import React from "react";
import { useParallax } from "@/hooks/useParallax";

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.15, className = "" }: ParallaxProps) {
  const ref = useParallax<HTMLDivElement>(speed);
  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
