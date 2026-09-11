"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GridLines() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });

  const lines = useMemo(() => {
    const group = new THREE.Group();
    const material = new THREE.LineBasicMaterial({ color: "#0a84ff", transparent: true, opacity: 0.06 });
    for (let i = -10; i <= 10; i++) {
      const points = [new THREE.Vector3(i, -10, -5), new THREE.Vector3(i, 10, -5)];
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      group.add(new THREE.Line(geo, material));
    }
    for (let i = -10; i <= 10; i++) {
      const points = [new THREE.Vector3(-10, i, -5), new THREE.Vector3(10, i, -5)];
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      group.add(new THREE.Line(geo, material));
    }
    return group;
  }, []);

  return <primitive ref={ref} object={lines} />;
}

export function Grid3D() {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none",
      opacity: 0.5,
    }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <GridLines />
      </Canvas>
    </div>
  );
}
