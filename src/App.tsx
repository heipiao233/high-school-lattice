import { ArcballControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { Fog } from "three";
import { AtomDescription, Lattice } from "./Lattice";
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
import type { AtomDef } from "./Atom";

function App() {
  const ctrl = useRef<ArcballCtrls>(null!);
  const [filled, setFilled] = useState<boolean>(false);
  const [showConnections, setShowConnections] = useState<boolean>(false);
  const [showBorders, setShowBorders] = useState<boolean>(false);
  const [multiSelect, setMultiSelect] = useState<boolean>(false);
  const [latticeKey, setLatticeKey] = useState<string>(() => {
    const hash = window.location.hash.slice(1);
    return lattices.has(hash) ? hash : "fcc";
  });
  const [selectedAtoms, setSelectedAtoms] = useState<AtomDef[]>([]);

  // 当晶胞类型变化时更新 hash
  useEffect(() => {
    window.location.hash = latticeKey;
    const handle = requestAnimationFrame(() => {
      setSelectedAtoms([]);
    })
    return () => cancelAnimationFrame(handle);
  }, [latticeKey]);
  const latticeTypes = Array.from(lattices.entries()).map(([type, def]) => (
    <MdSelectOption key={type} value={type}>
      <div slot="headline">{def.name}</div>
    </MdSelectOption>
  ));
  const lattice = lattices.get(latticeKey)!;
  const selectedAtomsDesc = selectedAtoms
    .map(atom => AtomDescription(atom, lattice));
  return (
    <>
      <div id="canvas-container" aria-label="3D可视化区域" role="application">
        <Canvas scene={{ fog: new Fog("#242424", 0, 150) }}>
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
            showConnections={showConnections}
            showBorders={showBorders}
            multiSelect={multiSelect}
            selectedAtoms={selectedAtoms}
            setSelectedAtoms={setSelectedAtoms}
          />
          <ArcballControls makeDefault ref={ctrl} />
        </Canvas>
      </div>
      <div id="side-panel" role="complementary" aria-label="控制面板">
        <div id="side-panel-content">
          <div id="controls" role="toolbar" aria-label="控制工具栏">
            <MdOutlinedSelect
              id="lattice-select"
              value={latticeKey}
              onChange={(e) => setLatticeKey(e.target.value)}
              aria-label="选择类型"
              aria-describedby="lattice-select-description"
            >
              {latticeTypes}
            </MdOutlinedSelect>
            <div id="lattice-select-description" className="sr-only">
              从下拉列表中选择要显示的类型
            </div>
            <MdOutlinedButton
              id="reset-camera-button"
              onClick={() => {
                ctrl.current.reset();
              }}
              aria-label="重置相机视角"
            >
              恢复视角
            </MdOutlinedButton>
            <MdOutlinedButton
              id="deselect-all-button"
              onClick={() => {
                setSelectedAtoms([])
              }}
              aria-label="清除选择"
            >
              清除选择
            </MdOutlinedButton>
            <div role="group" aria-label="填充选项" id="fill-option">
              <label
                htmlFor="filled-checkbox"
                style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              >
                <MdCheckbox
                  id="filled-checkbox"
                  checked={filled}
                  touch-target="wrapper"
                  onClick={() => {
                    setFilled(!filled);
                  }}
                  aria-label="切换原子填充显示"
                  aria-checked={filled}
                  role="checkbox"
                />
                <span style={{ marginLeft: "8px" }}>填充</span>
              </label>
            </div>
            <div role="group" aria-label="连接选项" id="connection-option">
              <label
                htmlFor="connections-checkbox"
                style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              >
                <MdCheckbox
                  id="connections-checkbox"
                  checked={showConnections}
                  touch-target="wrapper"
                  onClick={() => {
                    setShowConnections(!showConnections);
                  }}
                  aria-label="切换相邻原子连接显示"
                  aria-checked={showConnections}
                  role="checkbox"
                />
                <span style={{ marginLeft: "8px" }}>连接相邻原子</span>
              </label>
            </div>
            <div role="group" aria-label="边框选项" id="border-option">
              <label
                htmlFor="border-checkbox"
                style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              >
                <MdCheckbox
                  id="border-checkbox"
                  checked={showBorders}
                  touch-target="wrapper"
                  onClick={() => {
                    setShowBorders(!showBorders);
                  }}
                  aria-label="切换边框显示"
                  aria-checked={showBorders}
                  role="checkbox"
                />
                <span style={{ marginLeft: "8px" }}>显示边框</span>
              </label>
            </div>
            <div role="group" aria-label="多选选项" id="multiselect-option">
              <label
                htmlFor="multiselect-checkbox"
                style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              >
                <MdCheckbox
                  id="multiselect-checkbox"
                  checked={multiSelect}
                  touch-target="wrapper"
                  onClick={() => {
                    setMultiSelect(!multiSelect);
                  }}
                  aria-label="切换多选"
                  aria-checked={multiSelect}
                  role="checkbox"
                />
                <span style={{ marginLeft: "8px" }}>多选模式（Shift）</span>
              </label>
            </div>
          </div>
          {window.innerWidth > 768 && <MdDivider />}
          <article id="lattice-atom-desc" aria-labelledby="lattice-title">
            <h2 id="lattice-title">{lattice.name}</h2>
            <div role="region" aria-label="晶格描述">
              <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                {lattice.description}
              </Markdown>
            </div>
            {selectedAtomsDesc.length != 0 && (
              <div role="region" aria-label="所选原子信息">
                <h2>所选原子</h2>
                <div aria-live="polite" aria-atomic="true">
                  {selectedAtomsDesc}
                </div>
              </div>
            )}
          </article>
        </div>
        <footer>
          <a href="https://github.com/heipiao233/high-school-lattice">本网站开源</a>
          {/*<span>|</span>
          <a href="https://beian.miit.gov.cn/">备案申请中</a>*/}
        </footer>
      </div>
    </>
  );
}

export default App;
