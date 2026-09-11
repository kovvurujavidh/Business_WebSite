"use client";
import { useEffect, useRef, RefObject } from "react";

export function useTilt<T extends HTMLElement = HTMLDivElement>(
  maxTilt: number = 6
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = (0.5 - y) * maxTilt;
      const tiltY = (x - 0.5) * maxTilt;
      el.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.015)`;
      el.style.transition = "transform .15s ease-out";
    };

    const handleLeave = () => {
      el.style.transition = "transform .6s cubic-bezier(.16,1,.3,1)";
      el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    };

    el.addEventListener("mousemove", handleMove, { passive: true });
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [maxTilt]);

  return ref;
}