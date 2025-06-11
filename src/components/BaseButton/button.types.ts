import type { MouseEventHandler } from "react";
import type { TIconKeys } from "../../assets";

export interface TIndexString {
  [key: string]: string;
}
type TButton = "button" | "submit" | "reset" | undefined;

export interface IButton {
  title?: string;
  variant?: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "info" | "link" | "light" | "default" | "hidden" | "degraded";
  size?: string;
  margin?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: TIconKeys;
  iconWidth?: string;
  iconHeight?: string;
  toLink?: string;
  type?: TButton;
  id: string;
  iconColor?: string;
  className?: string;
  classContainer?: string;
  iconPosition?: "left" | "right";
  ariaLabel?: string;
  form?: string;
  gaEvent?: {
    category: string;
    action: string;
    label?: string;
    value?: number;
  };
}
