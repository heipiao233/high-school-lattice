import dedent from "dedent";
import type { LatticeDefWithTags } from "../Lattice";

export default {
  name: "六方最密堆积（六边形）",
  description: dedent`该结构清晰展示 **ABA** 堆叠方式：
  - **A 层**（底层与顶层）：原子位于正六边形的六个顶点及中心。
  - **B 层**（中间层）：三个原子位于 $A$ 层原子形成的半数四面体空隙上方，构成等边三角形，与上下两层原子均形成密置接触。

  层间距为 $\frac{c}{2} = \frac{\sqrt{8/3}}{2} \approx 0.8165$，其中 $c = \sqrt{\frac{8}{3}}$ 为六方晶胞的高。

  配位数为 12，6 个位于同一密置层，3 个在上层，3 个在下层。
  堆垛效率与面心立方相同，均为 $\frac{\pi}{\sqrt{18}} \approx 74\%$。

  常见的具有 HCP 结构的金属有镁、钛、锌、铍、镉等。`,
  atoms: [
    // 底层（A 层）七个原子：中心 + 六个顶点，y = -c/2
    { position: [0, -Math.sqrt(8 / 3) / 2, 0], tags: { layer: "A" } },
    { position: [1, -Math.sqrt(8 / 3) / 2, 0], tags: { layer: "A" } },
    { position: [0.5, -Math.sqrt(8 / 3) / 2, Math.sqrt(3) / 2], tags: { layer: "A" } },
    { position: [-0.5, -Math.sqrt(8 / 3) / 2, Math.sqrt(3) / 2], tags: { layer: "A" } },
    { position: [-1, -Math.sqrt(8 / 3) / 2, 0], tags: { layer: "A" } },
    { position: [-0.5, -Math.sqrt(8 / 3) / 2, -Math.sqrt(3) / 2], tags: { layer: "A" } },
    { position: [0.5, -Math.sqrt(8 / 3) / 2, -Math.sqrt(3) / 2], tags: { layer: "A" } },

    // 中间层（B 层）三个原子，呈等边三角形，y = 0
    { position: [0, 0, Math.sqrt(3) / 3], tags: { layer: "B" } },
    { position: [0.5, 0, -Math.sqrt(3) / 6], tags: { layer: "B" } },
    { position: [-0.5, 0, -Math.sqrt(3) / 6], tags: { layer: "B" } },

    // 顶层（A 层）七个原子，y = c/2
    { position: [0, Math.sqrt(8 / 3) / 2, 0], tags: { layer: "A" } },
    { position: [1, Math.sqrt(8 / 3) / 2, 0], tags: { layer: "A" } },
    { position: [0.5, Math.sqrt(8 / 3) / 2, Math.sqrt(3) / 2], tags: { layer: "A" } },
    { position: [-0.5, Math.sqrt(8 / 3) / 2, Math.sqrt(3) / 2], tags: { layer: "A" } },
    { position: [-1, Math.sqrt(8 / 3) / 2, 0], tags: { layer: "A" } },
    { position: [-0.5, Math.sqrt(8 / 3) / 2, -Math.sqrt(3) / 2], tags: { layer: "A" } },
    { position: [0.5, Math.sqrt(8 / 3) / 2, -Math.sqrt(3) / 2], tags: { layer: "A" } },
  ],
  mainTag: "layer",
  tags: {
    layer: {
      A: {
          color: 0x77ff00,
          name: "A 层",
          radius: 0.5,
          neighbours: [
              // 同一层（6 个）
              { position: [1, 0, 0], tags: { layer: "A" } },
              { position: [0.5, 0, Math.sqrt(3) / 2], tags: { layer: "A" } },
              { position: [-0.5, 0, Math.sqrt(3) / 2], tags: { layer: "A" } },
              { position: [-1, 0, 0], tags: { layer: "A" } },
              { position: [-0.5, 0, -Math.sqrt(3) / 2], tags: { layer: "A" } },
              { position: [0.5, 0, -Math.sqrt(3) / 2], tags: { layer: "A" } },
              // 上层（3 个）
              { position: [-0.5, Math.sqrt(8 / 3) / 2, -Math.sqrt(3) / 6], tags: { layer: "B" } },
              { position: [0.5, Math.sqrt(8 / 3) / 2, -Math.sqrt(3) / 6], tags: { layer: "B" } },
              { position: [0, Math.sqrt(8 / 3) / 2, Math.sqrt(3) / 3], tags: { layer: "B" } },
              // 下层（3 个）
              { position: [-0.5, -Math.sqrt(8 / 3) / 2, -Math.sqrt(3) / 6], tags: { layer: "B" } },
              { position: [0.5, -Math.sqrt(8 / 3) / 2, -Math.sqrt(3) / 6], tags: { layer: "B" } },
              { position: [0, -Math.sqrt(8 / 3) / 2, Math.sqrt(3) / 3], tags: { layer: "B" } },
          ],
      },
      B: {
        color: 0x00ccff,
        name: "B 层",
        radius: 0.5,
        neighbours: [
          // 同一层（6 个）
          { position: [1, 0, 0], tags: { layer: "B" } },
          { position: [0.5, 0, Math.sqrt(3) / 2], tags: { layer: "B" }  },
          { position: [-0.5, 0, Math.sqrt(3) / 2], tags: { layer: "B" }  },
          { position: [-1, 0, 0], tags: { layer: "B" }  },
          { position: [-0.5, 0, -Math.sqrt(3) / 2], tags: { layer: "B" }  },
          { position: [0.5, 0, -Math.sqrt(3) / 2], tags: { layer: "B" }  },
          // 上层（3 个）
          { position: [0.5, Math.sqrt(8 / 3) / 2, Math.sqrt(3) / 6], tags: { layer: "A" }  },
          { position: [-0.5, Math.sqrt(8 / 3) / 2, Math.sqrt(3) / 6], tags: { layer: "A" }  },
          { position: [0, Math.sqrt(8 / 3) / 2, -Math.sqrt(3) / 3], tags: { layer: "A" }  },
          // 下层（3 个）
          { position: [0.5, -Math.sqrt(8 / 3) / 2, Math.sqrt(3) / 6], tags: { layer: "A" }  },
          { position: [-0.5, -Math.sqrt(8 / 3) / 2, Math.sqrt(3) / 6], tags: { layer: "A" }  },
          { position: [0, -Math.sqrt(8 / 3) / 2, -Math.sqrt(3) / 3], tags: { layer: "A" }  },
        ],
      },
    },
  },
} as LatticeDefWithTags;
