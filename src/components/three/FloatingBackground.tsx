"use client";

import React, { Suspense, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("./Scene3D").then(mod => mod.Scene3D), { ssr: false });

export function FloatingBackground() {
  const orb1 = useRef<HTMLDivElement>(null);
  const orb2 = useRef<HTMLDivElement>(null);
  const orb3 = useRef<HTMLDivElement>(null);
  const orb4 = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const scrollY = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const animate = () => {
      currentY.current += (scrollY.current - currentY.current) * 0.06;
      const y = currentY.current;
      if (orb1.current) orb1.current.style.transform = `translate(${-y * 0.03}px, ${y * 0.08}px)`;
      if (orb2.current) orb2.current.style.transform = `translate(${y * 0.05}px, ${-y * 0.06}px)`;
      if (orb3.current) orb3.current.style.transform = `translate(${-y * 0.04}px, ${y * 0.05}px)`;
      if (orb4.current) orb4.current.style.transform = `translate(${y * 0.06}px, ${-y * 0.04}px)`;
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}>
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </div>
      <div ref={orb1} className="bg-orb bg-orb-1" />
      <div ref={orb2} className="bg-orb bg-orb-2" />
      <div ref={orb3} className="bg-orb bg-orb-3" />
      <div ref={orb4} className="bg-orb bg-orb-4" />
    </>
  );
}