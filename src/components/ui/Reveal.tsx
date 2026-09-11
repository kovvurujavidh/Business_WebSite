"use client";
import React from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  style?: React.CSSProperties;
  distance?: number;
}

const transforms: Record<string, (d: number) => string> = {
  up: (d) => `translateY(${d}px)`,
  down: (d) => `translateY(-${d}px)`,
  left: (d) => `translateX(${d}px)`,
  right: (d) => `translateX(-${d}px)`,
};

export function Reveal({ children, delay = 0, direction = "up", className = "", style, distance = 16 }: RevealProps) {
  const [ref, visible] = useScrollReveal<HTMLDivElement>({ threshold: 0.08 });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[direction](distance),
        transition: `opacity .85s cubic-bezier(.22,1,.36,1) ${delay}s, transform .85s cubic-bezier(.22,1,.36,1) ${delay}s`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function Stagger({ children, className = "", stagger = 0.07, direction = "up" }: StaggerProps) {
  const [ref, visible] = useScrollReveal<HTMLDivElement>({ threshold: 0.04 });
  const items = React.Children.toArray(children);

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <div
          key={i}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : transforms[direction](14),
            transition: `opacity .75s cubic-bezier(.22,1,.36,1) ${i * stagger}s, transform .75s cubic-bezier(.22,1,.36,1) ${i * stagger}s`,
            willChange: "opacity, transform",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}