import type { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

export type AtomDef = {
  position: [number, number, number];
  rotation?: [number, number, number]; // 欧拉角 (弧度), 顺序 XYZ
  invert?: boolean; // 是否对相对坐标取反（乘以 -1）
};

export type AtomDefWithTags = AtomDef & {
  tags: Record<string, string>;
};

type AtomProps = {
  position: [number, number, number];
  color: THREE.ColorRepresentation;
  radius: number;
  onClick?: (event: ThreeEvent<MouseEvent>) => void;
};

export function Atom({ position, color, radius, onClick }: AtomProps) {
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onClick?.(event);
  };

  return (
    <mesh position={position} onClick={handleClick}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial
        color={color}
        roughness={0.4}
        metalness={0.6}
      ></meshStandardMaterial>
    </mesh>
  );
}
