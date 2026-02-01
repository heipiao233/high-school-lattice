import { type LatticeDef } from "../Lattice";
import bcc from "./bcc";
import fcc from "./fcc";
import flourite from "./flourite";
import sc from "./sc";
import hcp_single from "./hcp_single";
import hcp_super from "./hcp_super";

export default new Map<string, LatticeDef>([
  ["fcc", fcc],
  ["bcc", bcc],
  ["sc", sc],
  ["flourite", flourite],
  ["hcp_single", hcp_single],
  ["hcp_super", hcp_super],
]);
