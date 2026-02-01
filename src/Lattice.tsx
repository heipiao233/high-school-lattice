import type { ColorRepresentation } from "three";
import { Atom, type AtomDef, type AtomDefWithTags } from "./Atom";
import { useState, useMemo, useEffect } from "react";

export type NeighbourDef = AtomDef;

export type NeighbourDefWithTags = AtomDefWithTags;

export type LatticeTag = {
  name: string;
  color: ColorRepresentation;
  radius: number;
  neighbours?: NeighbourDefWithTags[];
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

function positionToString(position: [number, number, number]): string {
  return position[0] + "," + position[1] + "," + position[2];
}

export function Lattice(lattice: LatticeProps) {
  const isTagged = lattice.hasOwnProperty("tags");
  const mainTag = isTagged
    ? (lattice as LatticeDefWithTags).tags[
        (lattice as LatticeDefWithTags).mainTag
      ]
    : {};

  const [selectedAtom, setSelectedAtom] = useState<AtomDef | null>(null);

  useEffect(() => {
    setSelectedAtom(null);
  }, [lattice.name, lattice.setAtomDesc]);

  useEffect(() => {
    if (lattice.setAtomDesc) {
      const desc = selectedAtom
        ? `坐标: (${selectedAtom.position.join(", ")})\n` +
          (isTagged
            ? `类型: ${mainTag[(selectedAtom as AtomDefWithTags).tags[(lattice as LatticeDefWithTags).mainTag]]?.name}`
            : "")
        : "";
      lattice.setAtomDesc(desc);
    }
  }, [selectedAtom, lattice.setAtomDesc]);

  const atomPositionSet = useMemo(() => {
    return new Set(
      lattice.atoms.map((atom) => positionToString(atom.position)),
    );
  }, [lattice.atoms]);

  const resolveTagFor = (atom: AtomDef): LatticeTag => {
    if (isTagged) {
      const tagged = atom as AtomDefWithTags;
      const tagKey = tagged.tags?.[(lattice as LatticeDefWithTags).mainTag];
      if (tagKey && mainTag[tagKey]) return mainTag[tagKey];
      if (mainTag["default"]) return mainTag["default"];
      const first = Object.values(mainTag)[0];
      if (first) return first;
      return { name: "unknown", color: 0x888888, radius: 0.1 } as LatticeTag;
    } else {
      const def = lattice as LatticeDefWithoutTags;
      return {
        name: def.name,
        color: def.color,
        radius: def.radius,
        neighbours: def.neighbours,
      } as LatticeTag;
    }
  };

  const neighbourAtoms: AtomDef[] = useMemo(() => {
    if (!selectedAtom) return [];

    const neighboursSource = isTagged
      ? resolveTagFor(selectedAtom).neighbours
      : (lattice as LatticeDefWithoutTags).neighbours;
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
        return {
          position: neighbourPosition,
          ...(isTagged
            ? { tags: (neighbour as NeighbourDefWithTags).tags }
            : {}),
        } as AtomDef;
      });
  }, [selectedAtom, lattice, isTagged, atomPositionSet]);

  const renderAtom = (atom: AtomDef, isSelected: boolean) => {
    const tag = resolveTagFor(atom);
    return (
      <Atom
        key={positionToString(atom.position)}
        position={atom.position}
        color={isSelected ? 0xff0000 : tag.color}
        radius={lattice.filled ? tag.radius : 0.1}
        onClick={() => {
          const newSelected = isSelected ? null : atom;
          setSelectedAtom(newSelected);
        }}
      />
    );
  };

  return (
    <>
      {/* 渲染所有实际原子 */}
      {lattice.atoms.map((atom) => renderAtom(atom, selectedAtom === atom))}

      {/* 渲染潜在邻居 */}
      {neighbourAtoms.map((atom) =>
        renderAtom(atom, selectedAtom?.position === atom.position),
      )}

      {/* 渲染选中的原子（如果不在原子列表中） */}
      {selectedAtom &&
        !atomPositionSet.has(positionToString(selectedAtom.position)) &&
        renderAtom(selectedAtom, true)}
    </>
  );
}
