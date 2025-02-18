import {reactRouter} from "@react-router/dev/vite";
import {defineConfig} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
  server: {
    port: 3001,
    open: true
  },
  build: {
    outDir: "build", // Asegúrese de que esto coincida con el directorio esperado
  },
});
