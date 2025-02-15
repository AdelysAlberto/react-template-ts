import {Outlet} from "react-router";
import style from "./public.style.module.css";
const PublicLayout = () => {
  return (
    <div className={style.body}>
      <Outlet />
    </div>
  );
};

export default PublicLayout;