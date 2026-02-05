import dedent from "dedent";
import type { LatticeDefWithTags } from "../Lattice";

export default {
  name: "金刚石",
  description: dedent`**金刚石结构**是一种典型的共价晶体结构，由碳形成正四面体结构构成。

  一个这样的晶胞含 8 个原子，其中每个顶点为 1/8 个，每个面心为 1/2 个。配位数为 4，原子间距为 $\sqrt{3}a/4$。

  计算空间利用率（设晶胞参数为 $a$）：
  $$\text{空间利用率} = \frac{\text{离子总体积}}{\text{晶胞体积}} = \frac{8 \times \frac{4}{3} \pi (\frac{3}{8} a)^3}{a^3} = 34\%$$

  具有金刚石型结构的晶体包括金刚石（C）、硅单质等。`,
  atoms: [
    {
      position: [-0.5, -0.5, -0.5],
      tags: {
        inv: "no"
      },
    },
    {
      position: [-0.5, -0.5, 0.5],
      tags: {
        inv: "no"
      },
    },
    {
      position: [-0.5, 0.5, -0.5],
      tags: {
        inv: "no"
      },
    },
    {
      position: [-0.5, 0.5, 0.5],
      tags: {
        inv: "no"
      },
    },
    {
      position: [0.5, -0.5, -0.5],
      tags: {
        inv: "no"
      },
    },
    {
      position: [0.5, -0.5, 0.5],
      tags: {
        inv: "no"
      },
    },
    {
      position: [0.5, 0.5, -0.5],
      tags: {
        inv: "no"
      },
    },
    {
      position: [0.5, 0.5, 0.5],
      tags: {
        inv: "no"
      },
    },
    {
      position: [-0.5, 0, 0],
      tags: {
        inv: "no"
      },
    },
    {
      position: [0, -0.5, 0],
      tags: {
        inv: "no"
      },
    },
    {
      position: [0, 0, -0.5],
      tags: {
        inv: "no"
      },
    },
    {
      position: [0.5, 0, 0],
      tags: {
        inv: "no"
      },
    },
    {
      position: [0, 0.5, 0],
      tags: {
        inv: "no"
      },
    },
    {
      position: [0, 0, 0.5],
      tags: {
        inv: "no"
      },
    },
    {
      position: [0.25, 0.25, 0.25],
      tags: {
        inv: "yes"
      },
    },
    {
      position: [-0.25, -0.25, 0.25],
      tags: {
        inv: "yes"
      },
    },
    {
      position: [0.25, -0.25, -0.25],
      tags: {
        inv: "yes"
      },
    },
    {
      position: [-0.25, 0.25, -0.25],
      tags: {
        inv: "yes"
      },
    },
  ],
  mainTag: "inv",
  tags: {
    inv: {
      yes: {
        radius: Math.sqrt(3) / 8,
        color: 0x77ff00, // 绿色
        neighbours: [
          { position: [0.25, 0.25, 0.25], tags: { inv: "no" } },
          { position: [-0.25, 0.25, -0.25], tags: { inv: "no" } },
          { position: [-0.25, -0.25, 0.25], tags: { inv: "no" } },
          { position: [0.25, -0.25, -0.25], tags: { inv: "no" } },
        ],
      },
      no: {
        radius: Math.sqrt(3) / 8,
        color: 0x00ccff, // 绿色
        neighbours: [
          { position: [-0.25, -0.25, -0.25], tags: { inv: "yes" } },
          { position: [0.25, -0.25, 0.25], tags: { inv: "yes" } },
          { position: [0.25, 0.25, -0.25], tags: { inv: "yes" } },
          { position: [-0.25, 0.25, 0.25], tags: { inv: "yes" } },
        ],
      },
    },
  },
} as LatticeDefWithTags;
