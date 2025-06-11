import BaseImage from "../BaseImage";
import Typography from "../Typography";
import styles from "./breadcrumbs.module.css";

interface IBreadcrumbsProps {
  currentStep?: number;
  arrayOfTitles?: string[];
}

const Breadcrumbs = (props: IBreadcrumbsProps) => {
  return (
    <div className={styles.container}>
      {props.arrayOfTitles?.map((title: string, index) => {
        if (props.arrayOfTitles && props.currentStep !== undefined) {
          return (
            <div className={`${styles["crumb-container"]}`}>
              <div className={`${styles["steps-container"]}`}>
                <div
                  className={`${styles["line-before"]} ${index !== 0 ? styles["line-visible"] : styles["line-hidden"]} ${
                    props.currentStep >= index ? styles["line-checked"] : styles["line-unchecked"]
                  }`}
                />
                <div className={`${styles["image-container"]} ${props.currentStep >= index ? styles["checked-step"] : styles["unchecked-step"]}`}>
                  {props.currentStep <= index ? (
                    <Typography
                      type={"h5"}
                      bold={"normal"}
                      customStyle={{
                        marginBottom: 1,
                        color: props.currentStep >= index ? "var(--color-white)" : "var(--color-gray-3)",
                      }}
                    >
                      {index + 1}
                    </Typography>
                  ) : (
                    <BaseImage
                      image={"icon-check-circle"}
                      width={32}
                      height={32}
                    />
                  )}
                </div>
                <div
                  className={`${styles["line-after"]} ${index !== props.arrayOfTitles.length - 1 ? styles["line-visible"] : styles["line-hidden"]} ${
                    props.currentStep > index ? styles["line-checked"] : styles["line-unchecked"]
                  }`}
                />
              </div>
              <Typography
                type={"h5"}
                bold={props.currentStep === index ? "bold" : "normal"}
              >
                {title}
              </Typography>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Breadcrumbs;
