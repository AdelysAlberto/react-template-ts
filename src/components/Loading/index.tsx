import type React from "react";
import type { ILoading } from "./interface";
import styles from "./styles/loading.module.css";

const Loading: React.FC<ILoading> = ({ isLoading, text, isModal = false, ariaLive = "polite", size = "medium" }) => {
  const getSize = (sizeX: string): object => {
    const sizes = {
      small: { width: "30px", height: "30px" },
      medium: { width: "50px", height: "50px" },
      large: { width: "125px", height: "125px" },
    };
    return sizes[sizeX as keyof typeof sizes];
  };

  return (
    <>
      {isModal && (
        <div
          className={`${styles.loading__modal} ${!isLoading ? styles.hide : ""}`}
          role="dialog"
          aria-labelledby="loadingLabel"
          aria-hidden={!isLoading}
        >
          <div className={styles.loading__content}>
            <div
              className={styles.loading__spinner}
              role="progressbar"
              aria-busy={isLoading}
              aria-valuenow={0}
              aria-valuemin={0}
              aria-valuemax={100}
              style={getSize(size)}
            >
              <div
                className={styles.loading__spinner__inner}
                style={getSize(size)}
              />
            </div>
            {text && <p id="loadingLabel">{text}</p>}
          </div>
        </div>
      )}

      {!isModal && (
        <div
          role="status"
          aria-live={ariaLive}
          aria-hidden={!isLoading}
          className={`${styles.loading__content} ${!isLoading ? styles.hide : ""}`}
        >
          <div
            className={styles.loading__spinner}
            role="progressbar"
            aria-valuenow={0}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-busy={isLoading}
            style={getSize(size)}
          >
            <div
              className={styles.loading__spinner__inner}
              style={getSize(size)}
            />
          </div>
          {text && <p>{text}</p>}
        </div>
      )}
    </>
  );
};
export default Loading;
