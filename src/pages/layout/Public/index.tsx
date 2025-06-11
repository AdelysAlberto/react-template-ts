import { Outlet } from "react-router";
import { useThemeStore } from "../../../store/theme.store";
import style from "./public.style.module.css";

const PublicLayout = () => {
  const theme = useThemeStore(state => state.theme);
  return (
    <main
      className={style.root}
      data-theme={theme}
    >
      <section className={style.main}>
        <Outlet />
      </section>
      <footer className={style.footer}>
        <span>© {new Date().getFullYear()} Fansity</span>
      </footer>
    </main>
  );
};

export default PublicLayout;
