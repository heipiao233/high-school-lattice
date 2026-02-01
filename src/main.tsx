import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "katex/dist/katex.css";
import App from "./App.tsx";
import * as m3 from "@material/material-color-utilities";
import { applySurfaceStyles } from "./theme.ts";

const theme = m3.themeFromSourceColor(0x95d5a8);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
m3.applyTheme(theme, {
  dark,
});
applySurfaceStyles(theme, { dark });
