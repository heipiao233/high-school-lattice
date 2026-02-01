import { type LatticeDef } from "../Lattice";
import bcc from "./bcc";
import fcc from "./fcc";
import flourite from "./flourite";
import sc from "./sc";

export default new Map<string, LatticeDef>([
  ["fcc", fcc],
  ["bcc", bcc],
  ["sc", sc],
  ["flourite", flourite]
]);
