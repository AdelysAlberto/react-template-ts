# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Using React Router v7

This template using react router v7 

*example Login using layout template*

```js
import {
  index,
  layout
} from "@react-router/dev/routes";

export default [
  layout("pages/layout/Public/index.tsx", [
    index("pages/public/Login/index.tsx"),
  ]),

]; 
```