import dedent from "dedent";
import type { LatticeDefWithoutTags } from "../Lattice";

export default {
  name: "六方最密堆积（三层六边形超晶胞）",
  description: dedent`**六方最密堆积（HCP）** 高中课本常见的三层展示结构：上下两层各 7 个原子（中心一个 + 正六边形顶点六个），中间层 3 个原子呈三角形排列，共 17 个原子。

  该结构清晰展示 **ABA** 堆叠方式：
  - **A 层**（底层与顶层）：原子位于正六边形的六个顶点及中心，彼此间距 $a = 1$。
  - **B 层**（中间层）：三个原子位于 $A$ 层原子形成的半数四面体空隙上方，构成等边三角形，与上下两层原子均形成密置接触。

  设 $a=1$，则同层最近邻距离为 $a=1$，原子半径 $r = a/2 = 0.5$，使最近邻原子恰好相切。
  层间距为 $\\frac{c}{2} = \\frac{\\sqrt{8/3}}{2} \\approx 0.8165$，其中 $c = \\sqrt{\\frac{8}{3}}$ 为六方晶胞的高。

  每个原子有 12 个最近邻：6 个位于同一密置层，3 个在上层，3 个在下层。
  配位数为 12，堆垛效率与面心立方相同，均为 $\\frac{\\pi}{\\sqrt{18}} \\approx 74\\%$。

  常见的具有 HCP 结构的金属有镁、钛、锌、铍、镉等。`,
  atoms: [
    // 底层（A 层）七个原子：中心 + 六个顶点，z = 0
    { position: [0, 0, 0] },
    { position: [1, 0, 0] },
    { position: [0.5, Math.sqrt(3) / 2, 0] },
    { position: [-0.5, Math.sqrt(3) / 2, 0] },
    { position: [-1, 0, 0] },
    { position: [-0.5, -Math.sqrt(3) / 2, 0] },
    { position: [0.5, -Math.sqrt(3) / 2, 0] },

    // 中间层（B 层）三个原子，呈等边三角形，z = c/2
    { position: [0, Math.sqrt(3) / 3, Math.sqrt(8 / 3) / 2] },
    { position: [0.5, -Math.sqrt(3) / 6, Math.sqrt(8 / 3) / 2] },
    { position: [-0.5, -Math.sqrt(3) / 6, Math.sqrt(8 / 3) / 2] },

    // 顶层（A 层）七个原子，z = c
    { position: [0, 0, Math.sqrt(8 / 3)] },
    { position: [1, 0, Math.sqrt(8 / 3)] },
    { position: [0.5, Math.sqrt(3) / 2, Math.sqrt(8 / 3)] },
    { position: [-0.5, Math.sqrt(3) / 2, Math.sqrt(8 / 3)] },
    { position: [-1, 0, Math.sqrt(8 / 3)] },
    { position: [-0.5, -Math.sqrt(3) / 2, Math.sqrt(8 / 3)] },
    { position: [0.5, -Math.sqrt(3) / 2, Math.sqrt(8 / 3)] },
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
