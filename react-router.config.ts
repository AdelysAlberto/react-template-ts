import type {Config} from "@react-router/dev/config";
import {indexPublicRoutes} from './src/routes';

export default {
  appDirectory: "src",
  ssr: true,
  async prerender() {
    return ["/", ...Object.values(indexPublicRoutes)];
  },
} satisfies Config;
