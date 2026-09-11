"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingShape({
  position,
  rotation,
  speed,
  geometry,
  color,
  wireframe = true,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  speed: number;
  geometry: "icosahedron" | "octahedron" | "torus" | "dodecahedron" | "tetrahedron";
  color: string;
  wireframe?: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.rotation.x = rotation[0] + t * 0.3;
    ref.current.rotation.y = rotation[1] + t * 0.5;
    ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.3;
  });

  const geo = useMemo(() => {
    switch (geometry) {
      case "icosahedron": return new THREE.IcosahedronGeometry(1, 0);
      case "octahedron": return new THREE.OctahedronGeometry(1, 0);
      case "torus": return new THREE.TorusGeometry(0.8, 0.3, 16, 32);
      case "dodecahedron": return new THREE.DodecahedronGeometry(1, 0);
      case "tetrahedron": return new THREE.TetrahedronGeometry(1, 0);
    }
  }, [geometry]);

  return (
    <mesh ref={ref} position={position} geometry={geo}>
      <meshBasicMaterial color={color} wireframe={wireframe} transparent opacity={0.15} />
    </mesh>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(180);
    const seed = [0.2,0.8,0.1,0.9,0.3,0.7,0.4,0.6,0.5,0.15,0.85,0.25,0.75,0.35,0.65,0.45,0.55,0.12,0.88,0.22];
    for (let i = 0; i < 180; i++) {
      pos[i] = (seed[i % seed.length] - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#0a84ff" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function Scene() {
  return (
    <>
      <FloatingShape position={[-3, 1, -4]} rotation={[0.5, 0.3, 0]} speed={0.4} geometry="icosahedron" color="#0a84ff" />
      <FloatingShape position={[3.5, -0.5, -5]} rotation={[0.2, 0.8, 0.1]} speed={0.3} geometry="octahedron" color="#6366f1" />
      <FloatingShape position={[0, 2, -6]} rotation={[0.7, 0.1, 0.4]} speed={0.25} geometry="torus" color="#06b6d4" />
      <FloatingShape position={[-2, -1.5, -3]} rotation={[0.1, 0.5, 0.2]} speed={0.35} geometry="dodecahedron" color="#8b5cf6" />
      <FloatingShape position={[2, 1.5, -7]} rotation={[0.4, 0.6, 0.3]} speed={0.2} geometry="tetrahedron" color="#0a84ff" />
      <Particles />
    </>
  );
}

export function Hero3D() {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none",
    }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}