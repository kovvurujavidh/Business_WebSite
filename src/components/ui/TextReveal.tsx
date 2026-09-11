"use client";
import React, { useEffect, useRef, useState } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function TextReveal({ text, className = "", delay = 0, speed = 40, tag }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setRevealed(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -20px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const words = text.split(" ");

  if (tag) {
    const Tag = tag;
    return (
      <Tag ref={containerRef} className={className}>
        {words.map((word, wi) => (
          <span key={wi} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.28em" }}>
            <span style={{
              display: "inline-block",
              opacity: revealed ? 1 : 0,
              transform: revealed ? "none" : "translateY(105%)",
              transition: `opacity .65s cubic-bezier(.22,1,.36,1) ${wi * speed}ms, transform .65s cubic-bezier(.22,1,.36,1) ${wi * speed}ms`,
            }}>
              {word}
            </span>
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <span ref={containerRef} className={className} style={{ display: "inline" }}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.28em" }}>
          <span style={{
            display: "inline-block",
            opacity: revealed ? 1 : 0,
            transform: revealed ? "none" : "translateY(105%)",
            transition: `opacity .65s cubic-bezier(.22,1,.36,1) ${wi * speed}ms, transform .65s cubic-bezier(.22,1,.36,1) ${wi * speed}ms`,
          }}>
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function SplitText({ text, className = "", delay = 0, stagger = 0.025 }: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
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

  return (
    <span ref={containerRef} className={className} style={{ display: "inline" }}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: revealed ? 1 : 0,
            transform: revealed ? "none" : "translateY(12px)",
            transition: `opacity .5s cubic-bezier(.22,1,.36,1) ${i * stagger}s, transform .5s cubic-bezier(.22,1,.36,1) ${i * stagger}s`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}