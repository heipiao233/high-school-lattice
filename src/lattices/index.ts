import { type LatticeDef } from "../Lattice";
import bcc from "./bcc";
import fcc from "./fcc";
import flourite from "./flourite";
import sc from "./sc";
import hcp from "./hcp";
import hcp_hex from "./hcp_hex";
import diamond from "./diamond";

export default new Map<string, LatticeDef>([
  ["fcc", fcc],
  ["bcc", bcc],
  ["sc", sc],
  ["flourite", flourite],
  ["hcp", hcp],
  ["hcp_hex", hcp_hex],
  ["diamond", diamond]
]);
