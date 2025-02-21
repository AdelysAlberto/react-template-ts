import {
  index,
  layout
} from "@react-router/dev/routes";

export default [
  layout("pages/layout/Public/index.tsx", [

    index("pages/public/Login/index.tsx", {}),

  ]),

]; 