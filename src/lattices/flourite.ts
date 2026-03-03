import dedent from "dedent";
import type { LatticeDefWithTags } from "../Lattice";

export default {
  name: "萤石（CaF₂）",
  description: dedent`**萤石（CaF₂）型结构**是一种典型的离子晶体结构，由钙离子形成面心立方格子，氟离子占据全部四面体空隙构成。

  一个这样的晶胞含 12 个离子，其中钙离子（Ca²⁺）4 个（面心立方顶点和面心，每个顶点为 1/8 个，每个面心为 1/2 个），氟离子（F⁻）8 个（全部位于四面体空隙中）。配位数为 8 和 4，即每个 Ca²⁺ 被 8 个 F⁻ 包围，每个 F⁻ 被 4 个 Ca²⁺ 包围，原子间距为 $\sqrt{3}a/4$（Ca-F）。

  计算空间利用率（设晶胞参数为 $a$，离子半径分别为 $r_+$ 和 $r_-$）：
  $$\text{空间利用率} = \frac{\text{离子总体积}}{\text{晶胞体积}} = \frac{4 \times \frac{4}{3} \pi r_+^3 + 8 \times \frac{4}{3} \pi r_-^3}{a^3} = \frac{16 \pi (r_+^3 + 2 r_-^3)}{3 a^3}$$

  对于 CaF₂，有数据称，$r_{\text{Ca}^{2+}} \approx 112 \text{pm}$，$r_{\text{F}^-} \approx 131 \text{pm}$，$a \approx 546 \text{pm}$，代入计算得：
  $$\text{空间利用率} \approx \frac{16 \pi (112^3 + 2 \times 131^3)}{3 \times 546^3} \approx 60.74\%$$

  具有萤石型结构的晶体包括萤石（CaF₂）、锶氟石（SrF₂）、钡氟石（BaF₂）以及二氧化铀（UO₂）等。还有阴离子与阳离子位置互换的反结构，称为反萤石结构，见于氧化锂（Li₂O）、氧化钠（Na₂O）等。`,
  atoms: [
    // 钙离子（Ca²⁺）- FCC位置
    {
      position: [-0.5, -0.5, -0.5],
      tags: {
        ion: "Ca",
      },
    },
    {
      position: [-0.5, -0.5, 0.5],
      tags: {
        ion: "Ca",
      },
    },
    {
      position: [-0.5, 0.5, -0.5],
      tags: {
        ion: "Ca",
      },
    },
    {
      position: [-0.5, 0.5, 0.5],
      tags: {
        ion: "Ca",
      },
    },
    {
      position: [0.5, -0.5, -0.5],
      tags: {
        ion: "Ca",
      },
    },
    {
      position: [0.5, -0.5, 0.5],
      tags: {
        ion: "Ca",
      },
    },
    {
      position: [0.5, 0.5, -0.5],
      tags: {
        ion: "Ca",
      },
    },
    {
      position: [0.5, 0.5, 0.5],
      tags: {
        ion: "Ca",
      },
    },
    // 面心钙离子
    {
      position: [-0.5, 0, 0],
      tags: {
        ion: "Ca",
      },
    },
    {
      position: [0, -0.5, 0],
      tags: {
        ion: "Ca",
      },
    },
    {
      position: [0, 0, -0.5],
      tags: {
        ion: "Ca",
      },
    },
    {
      position: [0.5, 0, 0],
      tags: {
        ion: "Ca",
      },
    },
    {
      position: [0, 0.5, 0],
      tags: {
        ion: "Ca",
      },
    },
    {
      position: [0, 0, 0.5],
      tags: {
        ion: "Ca",
      },
    },

    // 氟离子（F⁻）- 填充所有四面体空隙
    // 第一组四面体空隙（在钙离子的"上方"）
    {
      position: [0.25, 0.25, 0.25],
      tags: {
        ion: "F",
      },
    },
    {
      position: [0.25, -0.25, 0.25],
      tags: {
        ion: "F",
      },
      invert: true,
    },
    {
      position: [-0.25, 0.25, 0.25],
      tags: {
        ion: "F",
      },
      invert: true,
    },
    {
      position: [-0.25, -0.25, 0.25],
      tags: {
        ion: "F",
      },
    },
    {
      position: [0.25, 0.25, -0.25],
      tags: {
        ion: "F",
      },
      invert: true,
    },
    {
      position: [0.25, -0.25, -0.25],
      tags: {
        ion: "F",
      },
    },
    {
      position: [-0.25, 0.25, -0.25],
      tags: {
        ion: "F",
      },
    },
    {
      position: [-0.25, -0.25, -0.25],
      tags: {
        ion: "F",
      },
      invert: true,
    },
  ],
  borders: [
    [0, 1, 5, 4],
    [1, 3, 7, 5],
    [3, 2, 6, 7],
    [2, 0, 4, 6]
  ],
  mainTag: "ion",
  tags: {
    ion: {
      Ca: {
        radius: 3 * Math.sqrt(3) / 20, // 钙离子半径 = 3√3/20 ≈ 0.2598
        name: "钙离子",
        color: 0x0099ff, // 蓝色
        neighbours: [
          // 钙离子周围有8个氟离子（配位数为8）
          { position: [0.25, 0.25, 0.25], tags: { ion: "F" } },
          { position: [0.25, 0.25, -0.25], tags: { ion: "F" } },
          { position: [0.25, -0.25, 0.25], tags: { ion: "F" } },
          { position: [0.25, -0.25, -0.25], tags: { ion: "F" } },
          { position: [-0.25, 0.25, 0.25], tags: { ion: "F" } },
          { position: [-0.25, 0.25, -0.25], tags: { ion: "F" } },
          { position: [-0.25, -0.25, 0.25], tags: { ion: "F" } },
          { position: [-0.25, -0.25, -0.25], tags: { ion: "F" } },
        ],
      },
      F: {
        radius: Math.sqrt(3) / 10, // 氟离子半径 = √3/10 ≈ 0.1732
        name: "氟离子",
        color: 0x00ff00, // 绿色
        neighbours: [
          { position: [0.25, 0.25, 0.25], tags: { ion: "Ca" } },
          { position: [-0.25, 0.25, -0.25], tags: { ion: "Ca" } },
          { position: [-0.25, -0.25, 0.25], tags: { ion: "Ca" } },
          { position: [0.25, -0.25, -0.25], tags: { ion: "Ca" } },
        ],
      },
    },
  },
} as LatticeDefWithTags;
