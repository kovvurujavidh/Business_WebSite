"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WaveMesh() {
  const geoRef = useRef<THREE.PlaneGeometry>(null);

  useFrame((state) => {
    if (!geoRef.current) return;
    const geo = geoRef.current;
    const pos = geo.attributes.position;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      pos.setZ(i, Math.sin(x * 0.5 + t) * 0.15 + Math.cos(y * 0.5 + t * 0.7) * 0.15);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh rotation={[-Math.PI / 3, 0, 0]} position={[0, -1, -3]}>
      <planeGeometry ref={geoRef} args={[12, 8, 40, 40]} />
      <meshBasicMaterial color="#0a84ff" wireframe transparent opacity={0.07} />
    </mesh>
  );
}

export function Wave3D() {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none",
    }}>
      <Canvas
        camera={{ position: [0, 2, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <WaveMesh />
      </Canvas>
    </div>
  );
}
