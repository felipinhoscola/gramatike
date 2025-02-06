import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        appName: "Gramatike",
        sendMessageButton: "Send",
        textAreaPlaceholder: "Your text goes here...",
      },
    },
    "pt-BR": {
      translation: {
        appName: "Gramatike",
        sendMessageButton: "Enviar",
        textAreaPlaceholder: "Seu texto vai aqui...",
      },
    },
  },
});
