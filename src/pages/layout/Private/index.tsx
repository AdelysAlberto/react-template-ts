import { Outlet } from "react-router";
import { useThemeStore } from "../../../store/theme.store";

const PrivateLayout = () => {
  const theme = useThemeStore(state => state.theme);
  return (
    <div
      data-theme={theme}
      className="grid grid-cols-1 md:grid-cols-[80px_1fr] xl:grid-cols-[250px_1fr_300px] min-h-screen bg[var(--color-background]"
    >
      {/* Feed */}
      <main className="p-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
