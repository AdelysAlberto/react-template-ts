import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export const indexPublicRoutes = {
  login: "/",
  home: "/home",
  forgotPassword: "/forgot-password",
  forgotUsername: "/forgot-username",
};

export default [
  //index("pages/public/Login/index.tsx"),
  layout("pages/layout/Public/index.tsx", [index("pages/public/Home/index.tsx", {})]),

  layout("pages/layout/Private/index.tsx", [route("home", "pages/private/Home/index.tsx")]),

  // route("about", "routes/about.tsx"),

  // ...prefix("countries", [
  //   index("routes/countries.tsx"),
  //   route(":countryName", "routes/country.tsx"),
  // ]),
] satisfies RouteConfig;
