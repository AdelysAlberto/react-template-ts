import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, Meta, Links, ScrollRestoration, Scripts, Outlet } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body2 = new PassThrough();
          const stream = createReadableStreamFromReadable(body2);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body2);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "UTF-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0"
      }), /* @__PURE__ */ jsx("link", {
        rel: "icon",
        href: "/favicon.ico",
        sizes: "any"
      }), /* @__PURE__ */ jsx("link", {
        rel: "icon",
        type: "image/svg+xml",
        href: "/favicon.svg"
      }), /* @__PURE__ */ jsx("link", {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      }), /* @__PURE__ */ jsx("link", {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
      }), /* @__PURE__ */ jsx("link", {
        href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap",
        rel: "stylesheet"
      }), /* @__PURE__ */ jsx("title", {
        children: "My App"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function Root() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: root
}, Symbol.toStringTag, { value: "Module" }));
const body = "_body_12b1n_1";
const style = {
  body
};
const PublicLayout = () => {
  return /* @__PURE__ */ jsx("div", {
    className: style.body,
    children: /* @__PURE__ */ jsx(Outlet, {})
  });
};
const index$1 = withComponentProps(PublicLayout);
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$1
}, Symbol.toStringTag, { value: "Module" }));
const BaseButton = ({
  title,
  type = "button",
  onClick,
  className = "",
  disabled = false,
  variant = "primary",
  isLoading = false,
  id = "button"
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `btn btn-${variant} ${className}`,
      children: /* @__PURE__ */ jsx(
        "button",
        {
          id,
          type,
          onClick,
          className: ` `,
          disabled: isLoading || disabled,
          children: isLoading ? "Loading..." : title
        }
      )
    }
  );
};
const LoginPage = () => {
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Login"
    }), /* @__PURE__ */ jsx(BaseButton, {
      title: "Login",
      id: "submit-login",
      onClick: () => console.log("login"),
      variant: "primary"
    }), /* @__PURE__ */ jsx(BaseButton, {
      title: "secondary",
      id: "submit-login",
      onClick: () => console.log("login"),
      variant: "secondary"
    }), /* @__PURE__ */ jsx(BaseButton, {
      title: "danger",
      id: "submit-login",
      onClick: () => console.log("login"),
      variant: "danger"
    }), /* @__PURE__ */ jsx(BaseButton, {
      title: "disabled",
      id: "submit-login",
      onClick: () => console.log("login"),
      variant: "disabled"
    })]
  });
};
const index = withComponentProps(LoginPage);
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-pDsqQaAl.js", "imports": ["/assets/chunk-IR6S3I6Y-0ihj1Wgf.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root--v44jokz.js", "imports": ["/assets/chunk-IR6S3I6Y-0ihj1Wgf.js", "/assets/with-props-C5Yeyvd2.js"], "css": ["/assets/root-6dMDdyE0.css"] }, "pages/layout/Public/index": { "id": "pages/layout/Public/index", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-DHyizS5h.js", "imports": ["/assets/with-props-C5Yeyvd2.js", "/assets/chunk-IR6S3I6Y-0ihj1Wgf.js"], "css": ["/assets/index-B2i_XISB.css"] }, "pages/public/Login/index": { "id": "pages/public/Login/index", "parentId": "pages/layout/Public/index", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-CtHS1_A-.js", "imports": ["/assets/with-props-C5Yeyvd2.js", "/assets/chunk-IR6S3I6Y-0ihj1Wgf.js"], "css": [] } }, "url": "/assets/manifest-1d5bcd01.js", "version": "1d5bcd01" };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "pages/layout/Public/index": {
    id: "pages/layout/Public/index",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "pages/public/Login/index": {
    id: "pages/public/Login/index",
    parentId: "pages/layout/Public/index",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  publicPath,
  routes
};
