import dedent from "dedent";
import type { LatticeDefWithTags } from "../Lattice";

export default {
  name: "六方最密堆积",
  description: dedent`**六方最密堆积（HCP）** 的菱形晶胞，底面为 60°和120° 的菱形，高为 $c = \sqrt{\frac{8}{3}} a$。

  该晶胞包含 2 个原子，顶点上的原子为 $\frac{1}{6}$或 $\frac{1}{12}$个，中间的原子为一整个。

  每个原子配位数为 12：6 个位于同一密置层，3 个在上层，3 个在下层。
  空间利用率与面心立方相同，均为 $\frac{\pi}{\sqrt{18}} \approx 74\%$。

  常见的具有 HCP 结构的金属有镁、钛、锌、铍、镉等。`,
  atoms: [
      { position: [0, -Math.sqrt(8 / 3) / 2, 0], tags: { layer: "hcp_inverse_neighbour" } },
      { position: [1, -Math.sqrt(8 / 3) / 2, 0], tags: { layer: "hcp_inverse_neighbour" } },
      { position: [0.5, -Math.sqrt(8 / 3) / 2, Math.sqrt(3) / 2], tags: { layer: "hcp_inverse_neighbour" } },
      { position: [-0.5, -Math.sqrt(8 / 3) / 2, Math.sqrt(3) / 2], tags: { layer: "hcp_inverse_neighbour" } },

      { position: [0, 0, Math.sqrt(3) / 3], tags: { layer: "hcp" } },

      { position: [0, Math.sqrt(8 / 3) / 2, 0], tags: { layer: "hcp_inverse_neighbour" } },
      { position: [1, Math.sqrt(8 / 3) / 2, 0], tags: { layer: "hcp_inverse_neighbour" } },
      { position: [0.5, Math.sqrt(8 / 3) / 2, Math.sqrt(3) / 2], tags: { layer: "hcp_inverse_neighbour" } },
      { position: [-0.5, Math.sqrt(8 / 3) / 2, Math.sqrt(3) / 2], tags: { layer: "hcp_inverse_neighbour" } },
  ],
  mainTag: "layer",
  tags: {
      layer: {
          hcp: {
              color: 0x00ccff,
              radius: 0.5,
              neighbours: [
                  // 同一层（6 个）
                  { position: [1, 0, 0], tags: { layer: "hcp" } },
                  { position: [0.5, 0, Math.sqrt(3) / 2], tags: { layer: "hcp" }  },
                  { position: [-0.5, 0, Math.sqrt(3) / 2], tags: { layer: "hcp" }  },
                  { position: [-1, 0, 0], tags: { layer: "hcp" }  },
                  { position: [-0.5, 0, -Math.sqrt(3) / 2], tags: { layer: "hcp" }  },
                  { position: [0.5, 0, -Math.sqrt(3) / 2], tags: { layer: "hcp" }  },
                  // 上层（3 个）
                  { position: [0.5, Math.sqrt(8 / 3) / 2, Math.sqrt(3) / 6], tags: { layer: "hcp_inverse_neighbour" }  },
                  { position: [-0.5, Math.sqrt(8 / 3) / 2, Math.sqrt(3) / 6], tags: { layer: "hcp_inverse_neighbour" }  },
                  { position: [0, Math.sqrt(8 / 3) / 2, -Math.sqrt(3) / 3], tags: { layer: "hcp_inverse_neighbour" }  },
                  // 下层（3 个）
                  { position: [0.5, -Math.sqrt(8 / 3) / 2, Math.sqrt(3) / 6], tags: { layer: "hcp_inverse_neighbour" }  },
                  { position: [-0.5, -Math.sqrt(8 / 3) / 2, Math.sqrt(3) / 6], tags: { layer: "hcp_inverse_neighbour" }  },
                  { position: [0, -Math.sqrt(8 / 3) / 2, -Math.sqrt(3) / 3], tags: { layer: "hcp_inverse_neighbour" }  },
              ],
          },
          hcp_inverse_neighbour: {
              color: 0x00ccff,
              radius: 0.5,
              neighbours: [
                  // 同一层（6 个）
                  { position: [1, 0, 0], tags: { layer: "hcp_inverse_neighbour" } },
                  { position: [0.5, 0, Math.sqrt(3) / 2], tags: { layer: "hcp_inverse_neighbour" } },
                  { position: [-0.5, 0, Math.sqrt(3) / 2], tags: { layer: "hcp_inverse_neighbour" } },
                  { position: [-1, 0, 0], tags: { layer: "hcp_inverse_neighbour" } },
                  { position: [-0.5, 0, -Math.sqrt(3) / 2], tags: { layer: "hcp_inverse_neighbour" } },
                  { position: [0.5, 0, -Math.sqrt(3) / 2], tags: { layer: "hcp_inverse_neighbour" } },
                  // 上层（3 个）
                  { position: [-0.5, Math.sqrt(8 / 3) / 2, -Math.sqrt(3) / 6], tags: { layer: "hcp" } },
                  { position: [0.5, Math.sqrt(8 / 3) / 2, -Math.sqrt(3) / 6], tags: { layer: "hcp" } },
                  { position: [0, Math.sqrt(8 / 3) / 2, Math.sqrt(3) / 3], tags: { layer: "hcp" } },
                  // 下层（3 个）
                  { position: [-0.5, -Math.sqrt(8 / 3) / 2, -Math.sqrt(3) / 6], tags: { layer: "hcp" } },
                  { position: [0.5, -Math.sqrt(8 / 3) / 2, -Math.sqrt(3) / 6], tags: { layer: "hcp" } },
                  { position: [0, -Math.sqrt(8 / 3) / 2, Math.sqrt(3) / 3], tags: { layer: "hcp" } },
              ],
          },
      },
  },
} as LatticeDefWithTags;
