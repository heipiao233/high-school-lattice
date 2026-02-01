import type { ColorRepresentation } from "three";
import { Atom, type AtomDef, type AtomDefWithTags } from "./Atom";
import { useState, useMemo, useEffect } from "react";

export type NeighbourDef = AtomDef;

export type NeighbourDefWithTags = AtomDefWithTags;

export type LatticeTag = {
  name: string;
  color: ColorRepresentation;
  radius: number;
  neighbours?: (NeighbourDef | NeighbourDefWithTags)[];
};

type LatticeDefBase = {
  name: string;
  description?: string;
  atoms: AtomDef[];
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

function isNeighbourWithTags(neighbour: NeighbourDef): neighbour is NeighbourDefWithTags {
  return "tags" in neighbour;
}

// 辅助函数：获取带标签晶格的主标签映射
function getMainTagMap(lattice: LatticeDefWithTags) {
  return lattice.tags[lattice.mainTag] || {};
}

// 辅助函数：位置转字符串
function positionToString(position: [number, number, number]): string {
  return `${position[0]},${position[1]},${position[2]}`;
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
): NeighbourDef[] | NeighbourDefWithTags[] | undefined {
  const tag = resolveTagForAtom(atom, lattice);
  return tag.neighbours;
}

export function Lattice(lattice: LatticeProps) {
  const [selectedAtom, setSelectedAtom] = useState<AtomDef | null>(null);

  // 重置选中的原子当晶格改变时
  useEffect(() => {
    setSelectedAtom(null);
  }, [lattice.name, lattice.setAtomDesc]);

  // 更新原子描述
  useEffect(() => {
    if (!lattice.setAtomDesc || !selectedAtom) {
      if (lattice.setAtomDesc) {
        lattice.setAtomDesc("");
      }
      return;
    }

    let desc = `坐标: (${selectedAtom.position.join(", ")})\n`;
    
    if (isLatticeWithTags(lattice) && isAtomWithTags(selectedAtom)) {
      const mainTagMap = getMainTagMap(lattice);
      const tagKey = selectedAtom.tags?.[lattice.mainTag];
      const tag = tagKey ? mainTagMap[tagKey] : null;
      
      if (tag) {
        desc += `类型: ${tag.name}`;
      }
    }
    
    lattice.setAtomDesc(desc);
  }, [selectedAtom, lattice.setAtomDesc]);

  // 原子位置集合（用于快速查找）
  const atomPositionSet = useMemo(() => {
    return new Set(
      lattice.atoms.map((atom) => positionToString(atom.position)),
    );
  }, [lattice.atoms]);

  // 计算邻居原子
  const neighbourAtoms = useMemo(() => {
    if (!selectedAtom) return [];

    const neighboursSource = getNeighboursSource(selectedAtom, lattice);
    if (!neighboursSource) return [];

    return neighboursSource
      .filter((neighbour) => {
        const neighbourPosition: [number, number, number] = [
          selectedAtom.position[0] + neighbour.position[0],
          selectedAtom.position[1] + neighbour.position[1],
          selectedAtom.position[2] + neighbour.position[2],
        ];
        return !atomPositionSet.has(positionToString(neighbourPosition));
      })
      .map((neighbour) => {
        const neighbourPosition: [number, number, number] = [
          selectedAtom.position[0] + neighbour.position[0],
          selectedAtom.position[1] + neighbour.position[1],
          selectedAtom.position[2] + neighbour.position[2],
        ];
        
        const atomDef: AtomDef = {
          position: neighbourPosition,
        };
        
        // 如果是带标签的邻居，保留标签
        if (isNeighbourWithTags(neighbour)) {
          (atomDef as AtomDefWithTags).tags = neighbour.tags;
        }
        
        return atomDef;
      });
  }, [selectedAtom, lattice, atomPositionSet]);

  // 渲染单个原子
  const renderAtom = (atom: AtomDef, isSelected: boolean) => {
    const tag = resolveTagForAtom(atom, lattice);
    return (
      <Atom
        key={positionToString(atom.position)}
        position={atom.position}
        color={isSelected ? 0xff0000 : tag.color}
        radius={lattice.filled ? tag.radius : 0.1}
        onClick={() => {
          setSelectedAtom(isSelected ? null : atom);
        }}
      />
    );
  };

  // 检查原子是否在原子列表中
  const isAtomInList = (atom: AtomDef) => {
    return atomPositionSet.has(positionToString(atom.position));
  };

  return (
    <>
      {/* 渲染所有实际原子 */}
      {lattice.atoms.map((atom) => 
        renderAtom(atom, selectedAtom === atom)
      )}

      {/* 渲染潜在邻居 */}
      {neighbourAtoms.map((atom) =>
        renderAtom(atom, selectedAtom?.position === atom.position)
      )}

      {/* 渲染选中的原子（如果不在原子列表中） */}
      {selectedAtom && !isAtomInList(selectedAtom) &&
        renderAtom(selectedAtom, true)
      }
    </>
  );
}
