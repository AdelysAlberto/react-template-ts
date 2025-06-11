import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { getStorage, setStorage } from "../../store/storage";
import en from "./en";
import es from "./es";
type TToken = {
  lang?: string;
};

const DEFAULT_LANG = "en-US";
const configureLang = () => {
  let lang = DEFAULT_LANG;
  const getLangFromStorage = getStorage("@lang") as TToken;
  if (!getLangFromStorage || !getLangFromStorage.lang) {
    if (typeof window === "undefined") {
      return lang;
    }
    lang = navigator.language.toString();
    setStorage("@lang", { lang });
    return lang;
  }

  const language = getLangFromStorage.lang.toString().split("-")[0];

  return language;
};

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: configureLang(),
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
