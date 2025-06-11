import BaseImage from "../../../components/BaseImage";
import Typography from "../../../components/Typography";
import { useThemeStore } from "../../../store/theme.store";
import styles from "./footer.style.module.css";

const Footer = () => {
  const toggleTheme = useThemeStore(state => state.toggleTheme);
  return (
    <div className={styles.footer}>
      <div className={`${styles.footer__content} container`}>
        <div className={styles.footer__links}>
          <div className={`${styles.footer__about}`}>
            <div className={styles.footer__about_element}>
              <BaseImage
                image="icon-announcement"
                width={"20"}
                height={"20"}
              />
              <Typography colorClassName="text-white">About</Typography>
            </div>
            <div className={styles.footer__about_element}>
              <BaseImage
                image="icon-book"
                width={"20"}
                height={"20"}
              />
              <Typography colorClassName="text-white">Copyright</Typography>
            </div>
            <div className={styles.footer__about_element}>
              <BaseImage
                image="icon-lock"
                width={"20"}
                height={"20"}
              />
              <Typography colorClassName="text-white">Privacy</Typography>
            </div>
          </div>

          <div className={`flex-row ${styles.footer__logos}`}>
            <BaseImage
              image="logo-white"
              width={180}
              height={40}
            />
            <BaseImage
              image="logo-secondary"
              width={180}
              height={40}
            />
          </div>
        </div>

        <div className="flex-row justify-between">
          <Typography
            type="xxp"
            colorClassName="text-white"
          >
            {" "}
            © 2025 Fansity, all rights reserved
          </Typography>
          <div>
            <BaseImage
              image="icon-dark-mode"
              width={20}
              onClick={toggleTheme}
              height={20}
              alt="Change theme"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
