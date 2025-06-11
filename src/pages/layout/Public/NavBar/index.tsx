import BaseImage from "../../../../components/BaseImage";
import Typography from "../../../../components/Typography";
import { indexPublicRoutes } from "../../../../navigation/public.routes";
import styles from "./navBar.style.module.css";

const NavBar = () => {
  return (
    <div className={`${styles.navbar}`}>
      <div className={`${styles.navbar__content} container`}>
        <BaseImage
          image="logo-complete-white"
          className={styles.logo}
        />

        <div className="flex gap-2 ">
          <div className={`${styles.navbar__login}`}>
            <BaseImage image="icon-profile" />
            <Typography
              type="link"
              to={indexPublicRoutes.login}
              colorClassName="text-gray-6"
            >
              Log in
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
