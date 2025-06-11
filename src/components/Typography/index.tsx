import type React from "react";
import { Link } from "react-router";
import style from "./typography.module.css";

type TextProps = {
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p1" | "p2" | "p3" | "p" | "xp" | "xxp" | "link" | "span";
  bold?: "unset" | "semibold" | "bold" | "normal" | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  italic?: boolean;
  underline?: boolean;
  fontSize?: string;
  lineHeight?: string;
  colorClassName?: string;
  align?: "left" | "center" | "right" | "justify";
  className?: string;
  children: React.ReactNode;
  inLine?: boolean;
  textWrap?: "unset" | "wrap" | "nowrap";
  customStyle?: React.CSSProperties;
  to?: string;
};

const Typography: React.FC<TextProps> = ({
  type = "p",
  bold,
  italic = false,
  underline = false,
  colorClassName = "text-gray-1",
  align = "left",
  className = "",
  children,
  inLine = false,
  textWrap = "unset",
  customStyle = {},
  to = "",
}) => {
  const fontWeightMap = (): "unset" | "semibold" | "bold" | "normal" | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 => {
    if (type === "h1") {
      return 700;
    }

    if (["h2", "h3", "h4", "h5", "h6"].includes(type)) {
      return "semibold";
    }

    if (["p1", "p2", "p3", "p", "xp", "xxp", "link", "span"].includes(type)) {
      return "normal";
    }

    return "unset";
  };
  const textStyle: React.CSSProperties = {
    fontWeight: bold ?? fontWeightMap(),
    fontStyle: italic ? "italic" : "normal",
    textDecoration: underline ? "underline" : "none",
    textAlign: align,
    textWrap,
  };

  type TTypeMap = (type: TextProps["type"]) => "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
  const typeMap: TTypeMap = (type = "p") => {
    if (type === "h1" || type === "h2" || type === "h3" || type === "h4" || type === "h5" || type === "h6" || type === "span") {
      return type;
    }
    if (type === "p1" || type === "p2" || type === "p3" || type === "xp" || type === "xxp") {
      return "p";
    }
    return "p";
  };

  const Tag = typeMap(type);

  if (type === "link") {
    return (
      <Link
        to={to}
        target="_self"
        style={{ ...textStyle, ...customStyle, display: inLine ? "inline" : "block" }}
        className={`${colorClassName} ${style[`text-${type}`] ?? ""}  ${className} `}
      >
        {children}
      </Link>
    );
  }

  return (
    <Tag
      style={{ ...textStyle, ...customStyle, display: inLine ? "inline" : "block" }}
      className={`${className} ${colorClassName} ${style[`text-${type}`] ?? ""}`}
    >
      {children}
    </Tag>
  );
};

export default Typography;
