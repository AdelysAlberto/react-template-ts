// src/store/themeStore.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getStorage, setStorage } from "./storage";

interface ThemeState {
  theme: "light" | "dark";
  toggleTheme: (arg?: "dark" | "light") => void;
}

const getInitialDarkMode = (): "light" | "dark" => {
  type TSavedTheme = {
    theme: "light" | "dark";
  };
  const savedTheme = getStorage("theme") as TSavedTheme | null;

  if (!savedTheme) {
    setStorage("theme", {
      theme: "light",
    });
    return "light";
  }
  return savedTheme.theme;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      theme: getInitialDarkMode(),
      toggleTheme: () =>
        set(state => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "theme",
      partialize: state => ({ theme: state.theme }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);
