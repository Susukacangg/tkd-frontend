import i18n from 'i18next';
import {initReactI18next} from "react-i18next";

const resources = {
    en: {
        translation: {
            homeOption: "Home",
        }
    },
    ms: {
        translation: {
            homeOption: "Laman Utama"
        }
    }
};

i18n.use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        lng: 'ms',
        interpolation: {
            escapeValue: false
        }
    })