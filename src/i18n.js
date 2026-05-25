import i18n from "i18next";

import { initReactI18next } from "react-i18next";

import en from "./locals/en/translation.json";
import es from "./locals/es/translation.json";
import fr from "./locals/fr/translation.json";
import pt from "./locals/pt/translation.json";
import it from "./locals/it/translation.json";

i18n.use(initReactI18next).init({

    resources: {

        en: {
            translation: en,
        },

        es: {
            translation: es,
        },

        fr: {
            translation: fr,
        },

        pt: {
            translation: pt,
        },

        it: {
            translation: it,
        },
    },

    lng: "en",

    fallbackLng: "en",

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;