import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "katex/dist/katex.css";
import App from "./App.tsx";
import {themeFromSourceColor, applyTheme} from "@material/material-color-utilities";
import { applySurfaceStyles } from "./theme.ts";

const theme = themeFromSourceColor(0x95d5a8);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(theme, {
  dark,
});
applySurfaceStyles(theme, { dark });
