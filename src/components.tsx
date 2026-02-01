import React from "react";
import { createComponent } from "@lit/react";
import { MdOutlinedSelect as MdOutlinedSelectWebComponent } from "@material/web/select/outlined-select.js";
import { MdSelectOption as MdSelectOptionWebComponent } from "@material/web/select/select-option.js";
import { MdOutlinedButton as MdOutlinedButtonWebComponent } from "@material/web/button/outlined-button.js";
import { MdCheckbox as MdCheckboxWebComponent } from "@material/web/checkbox/checkbox.js";
import { MdDivider as MdDividerWebComponent } from "@material/web/divider/divider.js";

export const MdOutlinedSelect = createComponent({
  tagName: "md-outlined-select",
  elementClass: MdOutlinedSelectWebComponent,
  react: React,
});

export const MdSelectOption = createComponent({
  tagName: "md-select-option",
  elementClass: MdSelectOptionWebComponent,
  react: React,
});

export const MdOutlinedButton = createComponent({
  tagName: "md-outlined-button",
  elementClass: MdOutlinedButtonWebComponent,
  react: React,
});

export const MdCheckbox = createComponent({
  tagName: "md-checkbox",
  elementClass: MdCheckboxWebComponent,
  react: React,
});

export const MdDivider = createComponent({
  tagName: "md-divider",
  elementClass: MdDividerWebComponent,
  react: React,
});
