import type * as CSS from "csstype";
import type { ReactNode } from "react";
export interface ITooltip {
  className?: string;
  children: ReactNode;
  label: string;
  position?: "top" | "left" | "right" | "bottom";
  cs?: {
    label?: CSS.Properties;
    tooltip?: CSS.Properties;
  };
}
