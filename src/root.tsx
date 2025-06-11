import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useLoaderData, useLocation } from "react-router";

import { type ReactNode, useEffect } from "react";
import type { LoaderFunction } from "react-router";
import { z } from "zod";
import type { Route } from "../.react-router/types/src/+types/root";
import i18n from "./infra/lang";
import QueryWrapper from "./infra/queryProvider/QueryWrapper";
import "./styles/index.css";
import { initGA, trackPageView } from "./utils/analytics";

const LoaderDataSchema = z.object({
  lang: z.enum(["es", "en"]),
  initialI18nStore: z.record(z.record(z.record(z.string()))),
});

// 2. El loader corre en el servidor y devuelve idioma y store de i18n
export const loader: LoaderFunction = async ({ request }) => {
  const acceptLang = request.headers.get("accept-language") ?? "es";
  const lang = acceptLang.startsWith("en") ? "en" : "es";

  // Inicializamos i18n en SSR
  await i18n.changeLanguage(lang);
  const initialI18nStore = i18n.store.data as Record<string, Record<string, Record<string, string>>>;

  return { lang, initialI18nStore };
};

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },

  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css?family=Source Sans Pro:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap",
  },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Yellowtail&display=swap" },
  { rel: "icon", href: "./favicon.ico", type: "image/x-icon" },
];

// eslint-disable-next-line react-refresh/only-export-components
export function meta() {
  return [
    { title: import.meta.env.VITE_APP_TITLE },
    {
      property: "og:title",
      content: "Very cool app",
    },
    {
      name: "description",
      content: "This app is the best",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, user-scalable=no",
    },
  ];
}
declare global {
  interface Window {
    _env_: NodeJS.ProcessEnv;
  }
}
declare const window: Window;

type PartialWindowEnv = {
  _env_: NodeJS.ProcessEnv;
};

// Solo define esa propiedad
if (typeof window === "undefined") {
  (globalThis as typeof globalThis & { window: PartialWindowEnv }).window = globalThis.window || ({} as Window);
  (globalThis.window as PartialWindowEnv)._env_ = process.env;
}

export function Layout({ children }: { children: ReactNode }) {
  const rawData = useLoaderData();
  const { lang, initialI18nStore } = LoaderDataSchema.parse(rawData);

  // Hidratar i18n en el cliente antes del primer render
  i18n.store.data = initialI18nStore;
  i18n.language = lang;
  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />

        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <QueryWrapper>
        <Outlet />
      </QueryWrapper>
      <script dangerouslySetInnerHTML={{ __html: `window._env_ = ${JSON.stringify(window._env_)}` }} />
      <AnalyticsTracker pathname={location.pathname} />
    </>
  );
}

function AnalyticsTracker({ pathname }: { pathname: string }) {
  useEffect(() => {
    initGA();
    trackPageView(pathname);
  }, [pathname]);

  return null;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
