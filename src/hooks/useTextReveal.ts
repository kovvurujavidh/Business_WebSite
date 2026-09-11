"use client";
import { useState, useEffect, useRef, RefObject } from "react";

export function useTextReveal<T extends HTMLElement = HTMLSpanElement>(
  options: { delay?: number } = {}
): [RefObject<T | null>, boolean] {
  const { delay = 0 } = options;
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setRevealed(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return [ref, revealed];
}
