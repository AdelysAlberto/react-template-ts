import {
  type RouteConfig
} from "@react-router/dev/routes";
import publicRoutes from "./navigation/public.routes";

export default [
  //index("pages/public/Login/index.tsx"),
  ...publicRoutes,
  // route("about", "routes/about.tsx"),

  // ...prefix("countries", [
  //   index("routes/countries.tsx"),
  //   route(":countryName", "routes/country.tsx"),
  // ]),
] satisfies RouteConfig;