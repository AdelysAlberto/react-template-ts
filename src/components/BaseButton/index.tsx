import type React from "react";
import type { MouseEventHandler } from "react";
import { Link } from "react-router";
import { trackEvent } from "../../utils/analytics";
import BaseImage from "../BaseImage";
import Loading from "../Loading";
import type { IButton, TIndexString } from "./button.types";
import styles from "./styles/baseButton.module.css";

const Button: React.FC<IButton> = ({
  title,
  type = "button",
  variant = "primary",
  size = "default",
  margin = "mt-4",
  isLoading = false,
  onClick = e => e,
  disabled = false,
  icon = null,
  iconWidth = undefined,
  iconHeight = undefined,
  toLink = null,
  id,
  iconColor = "",
  classContainer = "",
  className = "",
  iconPosition = "left",
  ariaLabel,
  form,
  gaEvent,
}) => {
  const getTypeButton = (typeX: string) => {
    const types: TIndexString = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      tertiary: "btn-tertiary",
      success: "btn-success",
      warning: "btn-warning",
      danger: "btn-danger",
      info: "btn-info",
      link: "btn-link",
      light: "btn-light",
      default: "btn-default",
      hidden: "btn-hidden",
      degraded: "btn-degraded",
    };
    return types[typeX];
  };

  const getSize = (sizeX = "large") => {
    const types: TIndexString = {
      xs: "btn-xs",
      small: "btn-small",
      medium: "btn-medium",
      large: "btn-large",
    };
    return types[sizeX];
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    if (gaEvent) {
      trackEvent(gaEvent);
    }

    if (onClick) {
      onClick(e);
    }
  };

  const paddingWithIcon = icon && title ? `${styles[`padding__icon_${iconPosition}`]}` : `${styles.padding__default}`;
  return (
    <div className={`${classContainer} ${styles[`btn__${size}`]} ${margin} btn-container ${className} `}>
      {toLink ? (
        <Link
          to={disabled ? "#" : toLink}
          title={title}
          tabIndex={0}
          aria-label={ariaLabel}
          data-testid={id}
          className={`btn ${getSize(size)} ${getTypeButton(variant)} ${styles.button} ${disabled && "btn-disabled"}`}
          id={id}
        >
          {title}
        </Link>
      ) : (
        <button
          aria-label={ariaLabel}
          data-testid={id}
          type={type}
          className={`btn ${getTypeButton(variant)} ${(disabled || isLoading) && "btn-disabled"} ${paddingWithIcon} `}
          disabled={disabled || isLoading}
          title={title}
          onClick={disabled || isLoading ? undefined : handleClick}
          id={id}
          tabIndex={0}
          form={form}
        >
          {isLoading && (
            <Loading
              isLoading={isLoading}
              size="small"
            />
          )}
          {icon ? (
            iconPosition === "left" ? (
              <>
                <BaseImage
                  image={icon}
                  width={iconWidth}
                  height={iconHeight}
                  iconColor={variant === "secondary" ? undefined : iconColor}
                  className={variant === "secondary" ? "filter-color-secondary" : ""}
                />
                {title && <span style={{ marginLeft: 8 }}>{title}</span>}
              </>
            ) : (
              <>
                <span style={{ marginRight: 8 }}>{title}</span>
                <BaseImage
                  image={icon}
                  width={iconWidth}
                  height={iconHeight}
                  iconColor={iconColor}
                />
              </>
            )
          ) : (
            <span style={{ display: isLoading ? "none" : "inline-block" }}>{title}</span>
          )}
        </button>
      )}
    </div>
  );
};

export default Button;
