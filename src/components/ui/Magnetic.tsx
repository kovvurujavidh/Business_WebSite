"use client";
import React from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export function Magnetic({ children, strength = 0.3, className = "", as: Tag = "span" }: MagneticProps) {
  const ref = useMagnetic<HTMLElement>(strength);
  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className} style={{ display: "inline-block", willChange: "transform" }}>
      {children}
    </Tag>
  );
}