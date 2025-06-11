import type * as CSS from "csstype";

// TInputType with optional value range
export type TInputType = "text" | "number" | "password" | "textArea" | "date" | "email" | "textAreaPassword" | "range";

export interface IBaseInput {
  placeholder?: string;
  type?: TInputType;
  value?: string;
  onChange?: (value: string, name?: string, id?: string) => void;
  onBlur?: (e: string) => void;
  className?: string;
  maxLength?: number;
  minLength?: number;
  max?: number | string;
  min?: number | string;
  label?: string;
  labelColorText?: string;
  isLabelLeft?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  showErrorBelow?: boolean;
  error?: string | null;
  name?: string;
  required?: boolean;
  id: string;
  maxDecimals?: number;
  showIconError?: boolean;
  title?: string;
  size?: "small" | "medium" | "large" | "auto";
  tooltip?: string;
  disableNegativeNumbers?: boolean;
  disableDecimal?: boolean;
  textAlign?: "left" | "right";
  patternMessage?: string;
  cs?: {
    input?: CSS.Properties;
    label?: {
      label?: CSS.Properties;
      tooltip?: {
        label?: CSS.Properties;
        tooltip?: CSS.Properties;
      };
    };
    error?: CSS.Properties;
  };
  ariaLabel?: string;
  iconSearchPlaceholder?: boolean;
  autoComplete?: string;
  autoCapitalize?: string;
  spellCheck?: "true" | "false";
  autoCorrect?: string;
  autoSave?: string;
  validate?: string[];
}
