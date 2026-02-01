import dedent from "dedent";
import type { LatticeDefWithoutTags } from "../Lattice";

export default {
  name: "六方最密堆积（六边形超晶胞）",
  description: dedent`**六方最密堆积（HCP）** 的六边形超晶胞，由三个菱形原胞构成，底面呈现正六边形，便于观察六次旋转对称性。

  该超晶胞包含 6 个原子，分布在两个密置层（A 层和 B 层）。每层各有 3 个原子，呈现六边形排列。
  设 $a=1$，则最近邻距离为 $a=1$，原子半径 $r = a/2 = 0.5$，使最近邻原子恰好相切。

  每个原子有 12 个最近邻：6 个位于同一密置层，3 个在上层，3 个在下层。
  配位数为 12，堆垛效率与面心立方相同，均为 $\\frac{\\pi}{\\sqrt{18}} \\approx 74\\%$。

  常见的具有 HCP 结构的金属有镁、钛、锌、铍、镉等。`,
  atoms: [
    // A 层 (z = 0)
    { position: [0, 0, 0] },
    { position: [1, 0, 0] },
    { position: [0.5, Math.sqrt(3) / 2, 0] },
    // B 层 (z = c/2)
    { position: [0.5, Math.sqrt(3) / 6, Math.sqrt(8 / 3) / 2] },
    { position: [1.5, Math.sqrt(3) / 6, Math.sqrt(8 / 3) / 2] },
    { position: [1, Math.sqrt(3) * 2 / 3, Math.sqrt(8 / 3) / 2] },
  ],
  radius: 0.5,
  color: 0x00ccff,
  neighbours: [
    // 同一层（6 个）
    { position: [1, 0, 0] },
    { position: [0.5, Math.sqrt(3) / 2, 0] },
    { position: [-0.5, Math.sqrt(3) / 2, 0] },
    { position: [-1, 0, 0] },
    { position: [-0.5, -Math.sqrt(3) / 2, 0] },
    { position: [0.5, -Math.sqrt(3) / 2, 0] },
    // 上层（3 个）
    { position: [0.5, Math.sqrt(3) / 6, Math.sqrt(8 / 3) / 2] },
    { position: [-0.5, Math.sqrt(3) / 6, Math.sqrt(8 / 3) / 2] },
    { position: [0, -Math.sqrt(3) / 3, Math.sqrt(8 / 3) / 2] },
    // 下层（3 个）
    { position: [0.5, Math.sqrt(3) / 6, -Math.sqrt(8 / 3) / 2] },
    { position: [-0.5, Math.sqrt(3) / 6, -Math.sqrt(8 / 3) / 2] },
    { position: [0, -Math.sqrt(3) / 3, -Math.sqrt(8 / 3) / 2] },
  ],
} as LatticeDefWithoutTags;
