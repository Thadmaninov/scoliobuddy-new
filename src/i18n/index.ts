import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const en = require('./locales/en.json');
const th = require('./locales/th.json');
const ja = require('./locales/ja.json');
const ar = require('./locales/ar.json');
const zh = require('./locales/zh.json');
const es = require('./locales/es.json');
const fr = require('./locales/fr.json');

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: { translation: en },
      th: { translation: th },
      ja: { translation: ja },
      ar: { translation: ar },
      zh: { translation: zh },
      es: { translation: es },
      fr: { translation: fr },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
