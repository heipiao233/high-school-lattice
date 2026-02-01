import { ArcballControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Lattice } from "./Lattice";
import {
  MdCheckbox,
  MdDivider,
  MdOutlinedButton,
  MdOutlinedSelect,
  MdSelectOption,
} from "./components";
import lattices from "./lattices";
import { ArcballControls as ArcballCtrls } from "three-stdlib";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

function App() {
  const ctrl = useRef<ArcballCtrls>(null!);
  const [filled, setFilled] = useState<boolean>(false);
  const [latticeKey, setLatticeKey] = useState<string>(() => {
    const hash = window.location.hash.slice(1);
    return lattices.has(hash) ? hash : "fcc";
  });
  const [selectedAtomDesc, setSelectedAtomDesc] = useState<string>("");
  const atomDesc = selectedAtomDesc.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));

  // 当晶胞类型变化时更新 hash
  useEffect(() => {
    window.location.hash = latticeKey;
  }, [latticeKey]);
  const latticeTypes = Array.from(lattices.entries()).map(([type, def]) => (
    <MdSelectOption key={type} value={type}>
      <div slot="headline">{def.name}</div>
    </MdSelectOption>
  ));
  const lattice = lattices.get(latticeKey)!;
  return (
    <>
      <div id="canvas-container">
        <Canvas scene={{ fog: new THREE.Fog("#242424", 0, 150) }}>
          <ambientLight color={0xffffff} intensity={0.5} />
          <directionalLight
            color={0xffffff}
            position={[5, 8, 5]}
            intensity={1}
            castShadow
          />
          <directionalLight
            color={0xb0d9ff}
            position={[-6, 4, 4]}
            intensity={0.4}
          />
          <directionalLight
            color={0xffd9b0}
            position={[0, 6, -6]}
            intensity={0.3}
          />

          <Lattice
            {...lattice}
            filled={filled}
            setAtomDesc={setSelectedAtomDesc}
          />
          <ArcballControls makeDefault ref={ctrl} />
        </Canvas>
      </div>
      <div id="side-panel">
        <div id="side-panel-content">
          <div id="controls">
            <MdOutlinedSelect
              id="lattice-select"
              value={latticeKey}
              onChange={(e) => setLatticeKey((e.target as any).value)}
            >
              {latticeTypes}
            </MdOutlinedSelect>
            <MdOutlinedButton
              id="reset-camera-button"
              onClick={() => {
                ctrl.current.reset();
              }}
            >
              恢复视角
            </MdOutlinedButton>
            <label style={{ display: "flex", alignItems: "center" }}>
              <MdCheckbox
                id="filled-checkbox"
                checked={filled}
                touch-target="wrapper"
                onClick={() => {
                  setFilled(!filled);
                }}
              />
            填充
            </label>
          </div>
          {window.innerWidth > 768 && <MdDivider />}
          <article id="lattice-atom-desc">
            <h2>{lattice.name}</h2>
            <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
              {lattice.description}
            </Markdown>
            {selectedAtomDesc && <h2>所选原子</h2>}
            {atomDesc}
          </article>
        </div>
      </div>
    </>
  );
}

export default App;
