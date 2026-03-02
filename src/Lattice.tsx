import type { ColorRepresentation } from "three";
import * as THREE from "three";
import { Atom, type AtomDef, type AtomDefWithTags } from "./Atom";
import { useState, useMemo, useEffect } from "react";
import { Line } from "@react-three/drei";

export type NeighbourDef = AtomDef;

export type NeighbourDefWithTags = AtomDefWithTags;

export type LatticeTag = {
  name?: string;
  color: ColorRepresentation;
  radius: number;
  neighbours?: (NeighbourDef | NeighbourDefWithTags)[];
};

type LatticeDefBase = {
  name: string;
  description?: string;
  atoms: AtomDef[];
  borders: number[][];
};

export type LatticeDefWithTags = LatticeDefBase & {
  atoms: AtomDefWithTags[];
  mainTag: string;
  tags: Record<string, Record<string, LatticeTag>>;
};

export type LatticeDefWithoutTags = LatticeDefBase & {
  color: ColorRepresentation;
  radius: number;
  neighbours: NeighbourDef[];
};

export type LatticeDef = LatticeDefWithTags | LatticeDefWithoutTags;

export type LatticeProps = LatticeDef & {
  filled: boolean;
  showConnections?: boolean;
  showBorders?: boolean;
  multiSelect?: boolean;
  setAtomDesc?: (desc: string) => void;
};

// 类型守卫函数
function isLatticeWithTags(lattice: LatticeDef): lattice is LatticeDefWithTags {
  return "tags" in lattice && "mainTag" in lattice;
}

function isLatticeWithoutTags(lattice: LatticeDef): lattice is LatticeDefWithoutTags {
  return "color" in lattice && "radius" in lattice && "neighbours" in lattice;
}

function isAtomWithTags(atom: AtomDef): atom is AtomDefWithTags {
  return "tags" in atom;
}

// 辅助函数：获取带标签晶格的主标签映射
function getMainTagMap(lattice: LatticeDefWithTags) {
  return lattice.tags[lattice.mainTag] || {};
}

// 辅助函数：位置转字符串
function positionToString(position: [number, number, number]): string {
  return `${position[0].toFixed(4)},${position[1].toFixed(4)},${position[2].toFixed(4)}`;
}

// 辅助函数：将相对偏移向量应用原子的变换（旋转 + 反演）
function applyTransformToOffset(
  offset: [number, number, number],
  rotation?: [number, number, number],
  invert?: boolean
): [number, number, number] {
  const vec = new THREE.Vector3(offset[0], offset[1], offset[2]);
  // 1. 应用旋转
  if (rotation) {
    const [rx, ry, rz] = rotation;
    const euler = new THREE.Euler(rx, ry, rz, 'XYZ');
    vec.applyEuler(euler);
  }
  // 2. 应用反演
  if (invert) {
    vec.multiplyScalar(-1);
  }
  return [vec.x, vec.y, vec.z];
}

// 解析原子标签
function resolveTagForAtom(
  atom: AtomDef,
  lattice: LatticeDef
): LatticeTag {
  if (isLatticeWithTags(lattice) && isAtomWithTags(atom)) {
    const mainTagMap = getMainTagMap(lattice);
    const tagKey = atom.tags?.[lattice.mainTag];

    if (tagKey && mainTagMap[tagKey]) {
      return mainTagMap[tagKey];
    }

    if (mainTagMap["default"]) {
      return mainTagMap["default"];
    }

    const firstTag = Object.values(mainTagMap)[0];
    if (firstTag) {
      return firstTag;
    }

    // 默认标签
    return { name: "unknown", color: 0x888888, radius: 0.1 };
  } else if (isLatticeWithoutTags(lattice)) {
    return {
      name: lattice.name,
      color: lattice.color,
      radius: lattice.radius,
      neighbours: lattice.neighbours,
    };
  }

  // 默认情况
  return { name: "default", color: 0x888888, radius: 0.1 };
}

// 获取邻居源
function getNeighboursSource(
  atom: AtomDef,
  lattice: LatticeDef
): {
    neighbour: NeighbourDef | NeighbourDefWithTags,
    atom: AtomDef
    }[] {
  const tag = resolveTagForAtom(atom, lattice);
  return tag.neighbours?.map(neighbour => { return { atom, neighbour } }) || [];
}

function useArray<T>(initial: T[]) {
  const [items, setItems] = useState(initial);
  return {
    items,
    add: (item: T) => setItems(prev => [...prev, item]),
    remove: (index: number) => setItems(prev => prev.filter((_, i) => i !== index)),
    set: (item: T) => setItems([item]),
    clear: () => setItems([]),
    setItems
  };
}

function atomDescription(atom: AtomDef, lattice: LatticeProps): string {
  let desc = `坐标: (${positionToString(atom.position)})\n`;

  if (isLatticeWithTags(lattice) && isAtomWithTags(atom)) {
    const mainTagMap = getMainTagMap(lattice);
    const tagKey = atom.tags?.[lattice.mainTag];
    const tag = tagKey ? mainTagMap[tagKey] : null;

    if (tag && tag.name) {
      desc += `类型: ${tag.name}`;
    }
  }

  return desc;
}

export function Lattice(lattice: LatticeProps) {
  const { items: selectedAtoms, add: selectAtom, remove: deselectAtom, set: setSelected, clear: clearSelection } = useArray<AtomDef>([]);
  const { showConnections = false, showBorders = false } = lattice;

  // 重置选中的原子当晶格改变时
  useEffect(() => {
    // 使用requestAnimationFrame避免同步setState
    const timer = requestAnimationFrame(() => {
      clearSelection()
    });
    return () => cancelAnimationFrame(timer);
  }, [lattice.name, lattice.setAtomDesc]);

  // 更新原子描述
  useEffect(() => {
    if (!lattice.setAtomDesc || selectedAtoms.length === 0) {
      if (lattice.setAtomDesc) {
        lattice.setAtomDesc("");
      }
      return;
    }

    lattice.setAtomDesc(atomDescription(selectedAtoms[0], lattice));
  }, [selectedAtoms, lattice.setAtomDesc, lattice]);

  // 原子位置集合（用于快速查找）
  const atomPositionSet = useMemo(() => {
    return new Set(
      lattice.atoms.map((atom) => positionToString(atom.position)),
    );
  }, [lattice.atoms]);

  // 计算邻居原子（不包括已经在显示的原子）
  const neighbourAtoms = useMemo(() => {
    if (!selectedAtoms) return [];

    return selectedAtoms
      .flatMap((atom) => getNeighboursSource(atom, lattice))
      .map(({ atom, neighbour }) => {
        // 应用选中原子的变换到邻居的相对坐标
        const transformedOffset = applyTransformToOffset(
          neighbour.position,
          atom.rotation,
          atom.invert
        );
        const neighbourPosition: [number, number, number] = [
          atom.position[0] + transformedOffset[0],
          atom.position[1] + transformedOffset[1],
          atom.position[2] + transformedOffset[2],
        ];
        return {
          ...neighbour,
          position: neighbourPosition
        };
      })
      .filter(neighbour =>
        !atomPositionSet.has(positionToString(neighbour.position))
      );
  }, [selectedAtoms, lattice, atomPositionSet]);



  // 所有显示的原子集合（包括原始原子、选中的原子和邻居原子）
  const allAtomsShown = useMemo(() => {
    const atoms = [...lattice.atoms];

    // 添加选中的原子（如果不在原始原子列表中）
    selectedAtoms
      .filter(atom => !atomPositionSet.has(positionToString(atom.position)))
      .forEach(atom => atoms.push(atom))

    // 添加邻居原子（如果不在原子列表中）
    for (const atom of neighbourAtoms) {
      const atomStr = positionToString(atom.position);
      if (!atomPositionSet.has(atomStr) && !atoms.some(a => positionToString(a.position) === atomStr)) {
        atoms.push(atom);
      }
    }

    return atoms;
  }, [lattice.atoms, selectedAtoms, atomPositionSet, neighbourAtoms]);

  // 计算所有原子之间的连接线
  const connectionLines = useMemo(() => {
    if (!showConnections) return [];

    const lines: Array<{
      start: [number, number, number];
      end: [number, number, number];
      color: THREE.ColorRepresentation;
    }> = [];

    // 遍历所有原子
    for (let i = 0; i < allAtomsShown.length; i++) {
      const atom = allAtomsShown[i];
      const tag = resolveTagForAtom(atom, lattice);
      const neighboursSource = getNeighboursSource(atom, lattice);

      if (!neighboursSource) continue;

      // 计算当前原子的所有邻居位置
      for (const neighbour of neighboursSource) {
        const transformedOffset = applyTransformToOffset(
          neighbour.neighbour.position,
          atom.rotation,
          atom.invert
        );
        const neighbourPosition: [number, number, number] = [
          atom.position[0] + transformedOffset[0],
          atom.position[1] + transformedOffset[1],
          atom.position[2] + transformedOffset[2],
        ];

        // 检查邻居位置是否在原子列表中
        const neighbourPositionStr = positionToString(neighbourPosition);
        const neighbourAtom = allAtomsShown.find(a =>
          positionToString(a.position) === neighbourPositionStr
        );

        if (neighbourAtom) {
          // 获取邻居原子的标签颜色
          const neighbourTag = resolveTagForAtom(neighbourAtom, lattice);

          // 使用两个原子颜色的混合色
          const color = new THREE.Color(tag.color);
          const neighbourColor = new THREE.Color(neighbourTag.color);
          color.lerp(neighbourColor, 0.5);

          lines.push({
            start: atom.position,
            end: neighbourPosition,
            color: color.getHex(),
          });
        }
      }
    }

    return lines;
  }, [allAtomsShown, lattice, showConnections]);

  const borderLines = useMemo(() => lattice.borders.map((points) => {
    return points.map(i => lattice.atoms[i].position)
  }), [lattice.atoms, lattice.borders]);

  // 渲染单个原子
  const renderAtom = (atom: AtomDef, isSelected: boolean) => {
    const tag = resolveTagForAtom(atom, lattice);
    return (
      <Atom
        key={positionToString(atom.position)}
        position={atom.position}
        color={isSelected ? 0xff0000 : tag.color}
        radius={lattice.filled ? tag.radius : 0.1}
        onClick={event => {
          const idx = selectedAtoms.indexOf(atom);
          const ms = event.altKey || lattice.multiSelect;
          if (ms && idx === -1) {
            selectAtom(atom);
          } else if (ms) {
            deselectAtom(idx);
          } else {
            setSelected(atom);
          }
        }}
      />
    );
  };



  return (
    <>
      {/* 渲染所有原子 */}
      {allAtomsShown.map((atom) =>
        renderAtom(atom, selectedAtoms.indexOf(atom) !== -1)
      )}

      {/* 渲染连接线 */}
      {showConnections && connectionLines.map((line, index) => (
        <Line
          key={`${positionToString(line.start)}-${positionToString(line.end)}-${index}`}
          points={[line.start, line.end]}
          color={line.color}
        />
      ))}

      {/* 渲染边框 */}
      {showBorders && borderLines.map((line, index) => (
        <Line
          key={index}
          points={line}
          dashed={showConnections}
          dashScale={10}
          lineWidth={2}
        />
      ))}
    </>
  );
}
