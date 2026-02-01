import dedent from "dedent";
import type { LatticeDefWithTags } from "../Lattice";

export default {
  name: "面心立方堆积",
  description: dedent`**面心立方堆积**是一种常见的晶体结构，其中原子位于立方体的顶点和面心。

  实际上，它可以看作由图中用不同颜色标注的密置层交错堆叠而成，每三层重复一次。

  一个这样的晶胞含 4 个原子。位于顶点的原子每个为 1/8 个，位于面心的原子每个为 1/2 个。配位数为 12，原子间距为 $\frac{\sqrt{2}}{4} a$

  计算堆垛效率（设晶胞参数为 $a$）：
  $$\text{堆垛效率} = \frac{\text{原子体积}}{\text{晶胞体积}} = \frac{4 \times \frac{4}{3} \pi (\frac{\sqrt{2}a}{4})^3}{a^3} = \frac{\pi \sqrt{2}}{6} \approx 74\%$$

  这一结构的常见金属有铁、铬、钨等。`,
  atoms: [
    {
      position: [-0.5, -0.5, -0.5],
      tags: {
        layer: "layer_a",
      },
    },
    {
      position: [-0.5, -0.5, 0.5],
      tags: {
        layer: "layer_b",
      },
    },
    {
      position: [-0.5, 0.5, -0.5],
      tags: {
        layer: "layer_b",
      },
    },
    {
      position: [-0.5, 0.5, 0.5],
      tags: {
        layer: "layer_c",
      },
    },
    {
      position: [0.5, -0.5, -0.5],
      tags: {
        layer: "layer_b",
      },
    },
    {
      position: [0.5, -0.5, 0.5],
      tags: {
        layer: "layer_c",
      },
    },
    {
      position: [0.5, 0.5, -0.5],
      tags: {
        layer: "layer_c",
      },
    },
    {
      position: [0.5, 0.5, 0.5],
      tags: {
        layer: "layer_a",
      },
    },
    {
      position: [-0.5, 0, 0],
      tags: {
        layer: "layer_b",
      },
    },
    {
      position: [0, -0.5, 0],
      tags: {
        layer: "layer_b",
      },
    },
    {
      position: [0, 0, -0.5],
      tags: {
        layer: "layer_b",
      },
    },
    {
      position: [0.5, 0, 0],
      tags: {
        layer: "layer_c",
      },
    },
    {
      position: [0, 0.5, 0],
      tags: {
        layer: "layer_c",
      },
    },
    {
      position: [0, 0, 0.5],
      tags: {
        layer: "layer_c",
      },
    },
  ],
  mainTag: "layer",
  tags: {
    layer: {
      layer_a: {
        radius: Math.SQRT2 / 4,
        name: "A 层",
        color: 0x00ccff,
        neighbours: [
          { position: [0, -0.5, 0.5], tags: { layer: "layer_a" } },
          { position: [-0.5, 0, 0.5], tags: { layer: "layer_a" } },
          { position: [-0.5, 0.5, 0], tags: { layer: "layer_a" } },
          { position: [0, 0.5, -0.5], tags: { layer: "layer_a" } },
          { position: [0.5, 0, -0.5], tags: { layer: "layer_a" } },
          { position: [0.5, -0.5, 0], tags: { layer: "layer_a" } },

          { position: [0, 0.5, 0.5], tags: { layer: "layer_b" } },
          { position: [0.5, 0, 0.5], tags: { layer: "layer_b" } },
          { position: [0.5, 0.5, 0], tags: { layer: "layer_b" } },
          { position: [0, -0.5, -0.5], tags: { layer: "layer_c" } },
          { position: [-0.5, 0, -0.5], tags: { layer: "layer_c" } },
          { position: [-0.5, -0.5, 0], tags: { layer: "layer_c" } },
        ],
      },
      layer_b: {
        radius: Math.SQRT2 / 4,
        name: "B 层",
        color: 0x00cc00,
        neighbours: [
          { position: [0, -0.5, 0.5], tags: { layer: "layer_b" } },
          { position: [-0.5, 0, 0.5], tags: { layer: "layer_b" } },
          { position: [-0.5, 0.5, 0], tags: { layer: "layer_b" } },
          { position: [0, 0.5, -0.5], tags: { layer: "layer_b" } },
          { position: [0.5, 0, -0.5], tags: { layer: "layer_b" } },
          { position: [0.5, -0.5, 0], tags: { layer: "layer_b" } },

          { position: [0, 0.5, 0.5], tags: { layer: "layer_c" } },
          { position: [0.5, 0, 0.5], tags: { layer: "layer_c" } },
          { position: [0.5, 0.5, 0], tags: { layer: "layer_c" } },
          { position: [0, -0.5, -0.5], tags: { layer: "layer_a" } },
          { position: [-0.5, 0, -0.5], tags: { layer: "layer_a" } },
          { position: [-0.5, -0.5, 0], tags: { layer: "layer_a" } },
        ],
      },
      layer_c: {
        radius: Math.SQRT2 / 4,
        name: "C 层",
        color: 0x0000ff,
        neighbours: [
          { position: [0, -0.5, 0.5], tags: { layer: "layer_c" } },
          { position: [-0.5, 0, 0.5], tags: { layer: "layer_c" } },
          { position: [-0.5, 0.5, 0], tags: { layer: "layer_c" } },
          { position: [0, 0.5, -0.5], tags: { layer: "layer_c" } },
          { position: [0.5, 0, -0.5], tags: { layer: "layer_c" } },
          { position: [0.5, -0.5, 0], tags: { layer: "layer_c" } },

          { position: [0, 0.5, 0.5], tags: { layer: "layer_a" } },
          { position: [0.5, 0, 0.5], tags: { layer: "layer_a" } },
          { position: [0.5, 0.5, 0], tags: { layer: "layer_a" } },
          { position: [0, -0.5, -0.5], tags: { layer: "layer_b" } },
          { position: [-0.5, 0, -0.5], tags: { layer: "layer_b" } },
          { position: [-0.5, -0.5, 0], tags: { layer: "layer_b" } },
        ],
      },
    },
  },
} as LatticeDefWithTags;
