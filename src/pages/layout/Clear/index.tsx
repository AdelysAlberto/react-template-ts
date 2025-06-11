import { Outlet } from "react-router";
import style from "./clear.style.module.css";
const ClearLayout = () => {
  return (
    <div className={style.body}>
      <Outlet />
    </div>
  );
};

export default ClearLayout;
