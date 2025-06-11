import type React from "react";
import { useState } from "react";

import { useTranslation } from "react-i18next";
import BaseImage from "../../BaseImage";
import Label from "../../Label";
import ErrorBox from "../ErrorBox";
import type { IBaseInput } from "./baseInput.types";
import styles from "./styles/baseInput.module.css";
import { determineMaxLength } from "./utils.ts/determineMaxLength";
import { validateInputNumber } from "./utils.ts/validateInputNumber";

const Input: React.FC<IBaseInput> = ({
  placeholder,
  type = "text",
  value,
  onChange,
  onBlur,
  className = "",
  maxLength: maxLengthProp,
  minLength,
  max,
  min,
  label,
  readOnly = false,
  disabled = false,
  showErrorBelow = false,
  error,
  name,
  showIconError = false,
  isLabelLeft = false,
  required = false,
  cs,
  tooltip,
  size = "auto",
  id,
  disableNegativeNumbers = false,
  disableDecimal = false,
  textAlign = "left",
  labelColorText = "text-gray-1",
  title,
  maxDecimals,
  ariaLabel,
  iconSearchPlaceholder,
  autoComplete = "on",
  autoCapitalize = "off",
  spellCheck = "false",
  autoCorrect,
  autoSave,
  validate,
}) => {
  const customStyles = {
    ...cs,
  };
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const maxLength = determineMaxLength(type, maxLengthProp, maxDecimals);
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name;
    const id = event.target.id;

    const value = event.target.value;
    const [integerPart] = value.split(".");

    if (type === "number" && maxLengthProp !== undefined && integerPart.length > maxLengthProp) {
      const newValue = value.slice(0, maxLengthProp);
      onChange?.(newValue, name, id);
    }

    if (type === "number" && Number(value) < 0 && disableNegativeNumbers) {
      onChange?.("0", name, id);
    } else {
      onChange?.(value, name, id);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const clipboardData = e.clipboardData.getData("text");

    const validRegex = /^\d{2,20}$/;
    if (!validRegex.test(clipboardData)) {
      e.preventDefault();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, disableDecimal: boolean, disableNegativeNumbers: boolean) => {
    if (type !== "number" || value === undefined) {
      return;
    }

    validateInputNumber(e, disableDecimal, disableNegativeNumbers);

    const currentValue = Number.parseFloat(value) || 0;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newValue = currentValue + 1;
      onChange?.(newValue.toString(), name, id);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newValue = currentValue - 1;
      onChange?.(newValue.toString(), name, id);
    }
  };

  return (
    <div className={`${styles.input} input ${className} ${styles[`input__${size}`]} `}>
      <div className={`${isLabelLeft && styles.input__title_left} input-container ${disabled && "input-container__disabled"} } w-full`}>
        {label && (
          <Label
            label={t(label)}
            cs={customStyles.label}
            required={required}
            tooltip={tooltip}
            labelColorText={`${error || Boolean(!!error) ? "text-error" : ""} ${labelColorText}`}
            containerInline={isLabelLeft}
          />
        )}
        <div className={`${styles.input__base} ${styles[`input__${size}`]} ${!showPassword && styles.input__masked} `}>
          {type === "textArea" || type === "textAreaPassword" ? (
            <>
              <textarea
                autoComplete={autoComplete}
                autoCapitalize={autoCapitalize}
                spellCheck={spellCheck}
                autoCorrect={autoCorrect}
                autoSave={autoSave}
                readOnly={readOnly}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                name={name}
                id={id}
                data-testid={id}
                tabIndex={0}
                aria-required={required}
                aria-label={ariaLabel ?? name ?? label ?? id}
                rows={4}
                onChange={onChangeHandler}
                onBlur={onBlur ? e => onBlur(e.target.value) : undefined}
                className={`${styles.input_focus} ${styles[`input__${size}`]} ${error ? styles.input__error : ""} ${type === "textAreaPassword" && !showPassword && styles.masked} ${type === "textAreaPassword" && styles.password} input-text`}
                style={customStyles.input}
              />
              {type === "textAreaPassword" && (
                <div className={`${styles.input__icon}`}>
                  <BaseImage
                    image={"icon-eye"}
                    onClick={() => setShowPassword(!showPassword)}
                    alt={showPassword ? t("inputValidation.hidePassword") : t("inputValidation.showPassword")}
                    width={25}
                    height={18}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <input
                type={type === "password" ? (showPassword ? "text" : "password") : type}
                inputMode={type === "number" ? "numeric" : "text"}
                tabIndex={0}
                readOnly={readOnly}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                name={name}
                data-validate={validate?.join(",")}
                minLength={minLength}
                maxLength={maxLength}
                min={min}
                max={max}
                onChange={onChangeHandler}
                onKeyDown={e => handleKeyDown(e, disableDecimal, disableNegativeNumbers)}
                onPaste={type === "number" ? handlePaste : undefined}
                onBlur={onBlur ? e => onBlur(e.target.value) : undefined}
                className={`${styles.input_focus} ${error ? styles.input__error : ""} 
                ${styles[`text__align_${textAlign}`]} ${type === "password" && styles.password} input-text ${iconSearchPlaceholder && styles.input__icon__search}`}
                style={customStyles.input}
                id={id}
                aria-label={ariaLabel ?? name ?? label ?? id}
                data-testid={id}
                title={title}
                autoComplete={autoComplete}
                autoCapitalize={autoCapitalize}
                spellCheck={spellCheck}
                autoCorrect={autoCorrect}
                autoSave={autoSave}
                required={required}
              />
              {type === "password" && (
                <div className={`${styles.input__icon} `}>
                  <BaseImage
                    image={"icon-eye"}
                    onClick={() => setShowPassword(!showPassword)}
                    width={25}
                    height={18}
                    alt={showPassword ? t("inputValidation.hidePassword") : t("inputValidation.showPassword")}
                  />
                </div>
              )}
            </>
          )}

          {showErrorBelow && error && isLabelLeft && (
            <ErrorBox
              error={error ?? ""}
              showIcon={!!showIconError}
              style={customStyles.error}
            />
          )}
        </div>
      </div>

      {error && !isLabelLeft && (
        <ErrorBox
          error={required && disabled ? t("inputValidation.fieldRequiredAndDisabled") : error}
          showIcon={true}
          style={customStyles.error}
        />
      )}
    </div>
  );
};

export default Input;
