"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function RotatingTorus() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.2;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3;
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.3, 100, 16]} />
      <meshBasicMaterial color="#0a84ff" wireframe transparent opacity={0.12} />
    </mesh>
  );
}

function FloatingSpheres() {
  const groupRef = useRef<THREE.Group>(null);
  const spheres = [
    { position: [2.1, 1.5, -3.2] as [number, number, number], scale: 0.06, speed: 0.2, offset: 0 },
    { position: [-1.8, -0.8, -2.5] as [number, number, number], scale: 0.04, speed: 0.3, offset: 1.2 },
    { position: [0.5, 2.2, -4.1] as [number, number, number], scale: 0.05, speed: 0.15, offset: 2.4 },
    { position: [-2.5, 0.3, -3.8] as [number, number, number], scale: 0.03, speed: 0.25, offset: 3.6 },
    { position: [1.2, -1.5, -2.9] as [number, number, number], scale: 0.07, speed: 0.18, offset: 4.8 },
  ];

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const s = spheres[i];
      if (s) child.position.y = s.position[1] + Math.sin(state.clock.elapsedTime * s.speed + s.offset) * 0.5;
    });
  });

  return (
    <group ref={groupRef}>
      {spheres.map((s, i) => (
        <mesh key={i} position={s.position} scale={s.scale}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color="#6366f1" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

export function Background3D() {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none",
    }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <RotatingTorus />
        <FloatingSpheres />
      </Canvas>
    </div>
  );
}