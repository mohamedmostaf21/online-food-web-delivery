import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import arTranslations from './locales/ar.json';

const initialLanguage = localStorage.getItem('language') || 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    ar: { translation: arTranslations },
  },
  lng: initialLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

// Set initial direction
const setDirection = (lng) => {
  const dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
  document.documentElement.dir = dir;
  document.body.dir = dir;
};

// Set initial direction on load
setDirection(initialLanguage);

// Update direction when language changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
  setDirection(lng);
});

export default i18n;
