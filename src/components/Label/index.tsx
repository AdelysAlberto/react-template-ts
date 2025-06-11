import type * as CSS from "csstype";
import BaseImage from "../BaseImage";
import Tooltip from "../Tooltip";
import styles from "./styles/label.module.css";

export interface ILabelCs {
  label?: CSS.Properties;
  tooltip?: {
    label?: CSS.Properties;
    tooltip?: CSS.Properties;
  };
}

const Label = ({
  label,
  cs,
  required,
  tooltip,
  labelColorText = "text-gray-1",
  containerInline = false,
  smallFont,
}: {
  label?: string;
  cs?: ILabelCs;
  required?: boolean;
  tooltip?: string;
  labelColorText?: string;
  containerInline?: boolean;
  smallFont?: boolean;
}) => {
  return (
    <div className={`${styles.container} ${containerInline ? styles.container_inlineFlex : ""}`}>
      <label
        className={`${styles.label} ${required && label ? styles.label__required : ""} ${smallFont ? styles.small_font : ""} ${labelColorText.trim()} `}
        style={cs?.label}
        aria-label={label}
      >
        {label}
      </label>
      {tooltip && (
        <Tooltip
          className={styles.tooltip}
          label={tooltip}
          cs={cs?.tooltip}
        >
          <BaseImage
            image="icon-info-tooltip"
            width={10.5}
            height={10.5}
          />{" "}
        </Tooltip>
      )}
    </div>
  );
};

export default Label;
