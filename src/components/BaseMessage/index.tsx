import type { FC } from "react";
import { useTranslation } from "react-i18next";
import type { TIconKeys } from "../../assets";
import BaseImage from "../BaseImage";
import Typography from "../Typography";
import styles from "./baseMessage.module.css";

interface IBaseMessage {
  title?: string;
  message: string;
  type?: string;
  icon?: TIconKeys;
}

export type IKey = {
  [k: string]: string;
};
const BaseMessage: FC<IBaseMessage> = ({ message, type, title }) => {
  const { t } = useTranslation();
  const getIconType = (type: string): TIconKeys => {
    const typeError: IKey = {
      error: "icon-error",
      success: "icon-success",
    };

    return (typeError[type] as TIconKeys) || "icon-error";
  };
  return (
    <div className={styles.container}>
      <div className={styles.container__icon}>
        <BaseImage
          image={type ? getIconType(type) : "icon-error"}
          width={20}
          height={20}
        />
      </div>
      <div className={styles.container__text}>
        {title && <Typography bold={600}>{t(title as string)}</Typography>}
        <Typography>{message}</Typography>
      </div>
    </div>
  );
};

export default BaseMessage;
