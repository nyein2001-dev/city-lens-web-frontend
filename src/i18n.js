import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './assets/i18n/en-US.json';
import ptTranslations from './assets/i18n/mm-MM.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      pt: { translation: ptTranslations },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
