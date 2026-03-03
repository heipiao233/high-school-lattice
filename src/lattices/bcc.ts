import dedent from "dedent";
import type { LatticeDefWithoutTags } from "../Lattice";

export default {
  name: "体心立方堆积",
  description: dedent`**体心立方堆积**是一种常见的晶体结构，由非密置层交错堆叠而成，其中原子位于立方体的顶点和体心。

  一个这样的晶胞含 2 个原子。位于顶点的原子每个为 1/8 个，位于体心的原子为 1 个。配位数为 8，最近邻原子间距为 $\frac{\sqrt{3}}{2}a$（原子半径为 $\frac{\sqrt{3}}{4}a$）。

  计算空间利用率（设晶胞参数为 $a$）：
  $$\text{空间利用率} = \frac{\text{原子体积}}{\text{晶胞体积}} = \frac{2 \times \frac{4}{3} \pi (\frac{\sqrt{3}a}{4})^3}{a^3} = \frac{\pi \sqrt{3}}{8} \approx 68\%$$

  这一结构的常见金属有铁（室温）、铬、钨、钼、钒等。`,
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
    {
      position: [0, 0, 0],
    },
  ],
  borders: [
    [0, 1, 5, 4],
    [1, 3, 7, 5],
    [3, 2, 6, 7],
    [2, 0, 4, 6]
  ],
  radius: Math.sqrt(3) / 4,
  color: 0x00ccff,
  neighbours: [
    { position: [0.5, 0.5, 0.5] },
    { position: [0.5, 0.5, -0.5] },
    { position: [0.5, -0.5, 0.5] },
    { position: [0.5, -0.5, -0.5] },
    { position: [-0.5, 0.5, 0.5] },
    { position: [-0.5, 0.5, -0.5] },
    { position: [-0.5, -0.5, 0.5] },
    { position: [-0.5, -0.5, -0.5] },
  ],
} as LatticeDefWithoutTags;
