import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import moment from 'moment';

import translationEN from './i18n/en/translation';
import translationRU from './i18n/ru/translation';

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
};

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    whitelist: ['en', 'ru-RU'],
    lng: "ru",
    fallbackLng: 'en',
    debug: true,
    resources,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

// i18n.on('languageChanged', function(lng) {
//   console.log('languageChanged', lng);
//   if (lng.indexOf('ru') === 0) {
//     require('moment/locale/ru');
//     moment.locale('ru');
//   } else {
//     require('moment/locale/en-au');
//     moment.locale('en');
//   }
// });

export default i18n;
