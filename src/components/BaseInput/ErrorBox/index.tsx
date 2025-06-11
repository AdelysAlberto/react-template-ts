import type * as CSS from "csstype";
import BaseImage from "../../BaseImage";
import styles from "./styles/errorBox.module.css";
const ErrorBox = ({
  error,
  showIcon,
  style,
}: {
  error?: string;
  showIcon?: boolean;
  style?: CSS.Properties;
}) => {
  return (
    <div
      className={`${styles.footer} `}
      style={style}
    >
      {showIcon && (
        <BaseImage
          image="icon-error"
          width={16}
          height={16}
          iconColor="filter-error"
        />
      )}
      <span title={error}>{error}</span>
    </div>
  );
};

export default ErrorBox;
