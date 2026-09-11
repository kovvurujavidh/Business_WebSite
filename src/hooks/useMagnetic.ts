"use client";
import { useEffect, useRef, RefObject } from "react";

export function useMagnetic<T extends HTMLElement = HTMLDivElement>(
  strength: number = 0.3
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cxCenter = rect.left + rect.width / 2;
      const cyCenter = rect.top + rect.height / 2;
      tx = (e.clientX - cxCenter) * strength;
      ty = (e.clientY - cyCenter) * strength;
      if (!raf) tick();
    };

    const tick = () => {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      el.style.transform = `translate(${cx}px, ${cy}px)`;
      if (Math.abs(tx - cx) > 0.01 || Math.abs(ty - cy) > 0.01) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const handleLeave = () => {
      tx = 0;
      ty = 0;
      if (!raf) tick();
    };

    el.addEventListener("mousemove", handleMove, { passive: true });
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return ref;
}