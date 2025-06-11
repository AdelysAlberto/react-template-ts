import type React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import styles from "./link.module.css";

interface IBaseLink {
  to: string;
  className?: string;
  query?: string;
  label: string;
  chevronRight?: boolean;
  chevronLeft?: boolean;
  linkInLine?: boolean;
}
const BaseLink: React.FC<IBaseLink> = ({ to, className = "", query, label, chevronRight = false, chevronLeft = false, linkInLine }) => {
  const { t } = useTranslation();
  return (
    <Link
      to={{
        pathname: to,
        search: query,
      }}
      className={`${styles.label} ${className}`}
      style={{ display: `${linkInLine ? "inline-flex" : "block"}` }}
    >
      {chevronLeft && <span className={`${styles.chevron} ${styles.chevronLeft}`}>&lsaquo;</span>}

      <span>{t(label)}</span>

      {chevronRight && <span className={`${styles.chevron} ${styles.chevronRight}`}>&rsaquo;</span>}
    </Link>
  );
};

export default BaseLink;
