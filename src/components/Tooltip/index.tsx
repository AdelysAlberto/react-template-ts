import { useSignal } from "@preact/signals-react";
import type React from "react";
import { useRef } from "react";
import type { ITooltip } from "./interface";
import styles from "./styles/tooltip.module.css";

const TOOLTIP_POSITION = {
  left: "left",
  right: "right",
  top: "top",
};

const Tooltip: React.FC<ITooltip> = ({ className, children, label, position, cs }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const positionAuto = useSignal<string>(position ? position : TOOLTIP_POSITION.right);

  const handleMouseOver = (event: React.MouseEvent) => {
    const tooltip = tooltipRef.current;
    if (tooltip && !position) {
      const { clientX: mouseX } = event;
      const { offsetWidth: tooltipWidth } = tooltip;
      const { innerWidth: windowWidth } = window;

      if (windowWidth - mouseX > tooltipWidth) {
        positionAuto.value = TOOLTIP_POSITION.right;
      } else if (mouseX > tooltipWidth) {
        positionAuto.value = TOOLTIP_POSITION.left;
      } else {
        positionAuto.value = TOOLTIP_POSITION.top;
      }
    }
  };

  return (
    <div
      onMouseOver={handleMouseOver}
      onFocus={() => {}}
      className={`${styles.container} ${className}`}
    >
      {children}
      <span
        ref={tooltipRef}
        style={cs?.tooltip}
        className={`${styles.tooltip} ${styles[`tooltip-${positionAuto.value}`]}`}
      >
        {label}
      </span>
    </div>
  );
};

export default Tooltip;
