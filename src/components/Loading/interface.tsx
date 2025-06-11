export interface ILoading {
  isLoading: boolean;
  text?: string;
  isModal?: boolean;
  ariaLive?: "assertive" | "off" | "polite";
  size?: "small" | "medium" | "large";
}
