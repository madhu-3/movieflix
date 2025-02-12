import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import hi from "./locales/hi.json";
i18next
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escape: false,
    },
    resources: {
      en: { translation: en },
      hi: { translation: hi },
    },
  });
