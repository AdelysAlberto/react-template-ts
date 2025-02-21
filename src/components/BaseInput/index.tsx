import React from "react";

interface BaseInputProps {
  label?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  error?: string
}

const BaseInput: React.FC<BaseInputProps> = ({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  disabled = false,
  size = "large",
  error,
}) => {
  return (
    <div className={`input-container input-${size} ${className}`}>
      {label && <label className="input-label" htmlFor={id}>{label}</label>}

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input ${error ? "mb-1" : ""}`}
        disabled={disabled}
      />

      {error && <span className="input-error">{error}</span>}

    </div>
  );
};

export default BaseInput;