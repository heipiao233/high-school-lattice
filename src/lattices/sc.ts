import dedent from "dedent";
import type { LatticeDefWithoutTags } from "../Lattice";

export default {
  name: "简单立方堆积",
  description: dedent`**简单立方堆积**是一种晶体结构，由非密置层交错堆叠而成，其中原子位于立方体的顶点。

  一个这样的晶胞含 1 个原子。位于顶点的原子每个为 1/8 个。配位数为 6，原子间距为 $\frac{1}{2}$

  计算堆垛效率（设晶胞参数为 $a$）：
  $$\text{堆垛效率} = \frac{\text{原子体积}}{\text{晶胞体积}} = \frac{\frac{4}{3} \pi (\frac{a}{2})^3}{a^3} = \frac{\pi}{6} \approx 52\%$$

  这一结构的金属有钋。`,
  atoms: [
    {
      position: [-0.5, -0.5, -0.5],
    },
    {
      position: [-0.5, -0.5, 0.5],
    },
    {
      position: [-0.5, 0.5, -0.5],
    },
    {
      position: [-0.5, 0.5, 0.5],
    },
    {
      position: [0.5, -0.5, -0.5],
    },
    {
      position: [0.5, -0.5, 0.5],
    },
    {
      position: [0.5, 0.5, -0.5],
    },
    {
      position: [0.5, 0.5, 0.5],
    },
  ],
  radius: 1 / 2,
  color: 0x00ccff,
  neighbours: [
    { position: [0, 0, 1] },
    { position: [0, 1, 0] },
    { position: [1, 0, 0] },
    { position: [0, 0, -1] },
    { position: [0, -1, 0] },
    { position: [-1, 0, 0] },
  ],
} as LatticeDefWithoutTags;
