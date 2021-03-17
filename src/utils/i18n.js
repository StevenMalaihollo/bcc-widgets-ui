import english from "../localization/en/app.json";
import french from "../localization/fr/app.json";
import norwegian from "../localization/no/app.json";
import german from "../localization/de/app.json";
import dutch from "../localization/nl/app.json";
import finish from "../localization/fi/app.json";
import spanish from "../localization/es/app.json";


import VueI18n from "vue-i18n";
import Vue from "vue";

Vue.use(VueI18n);

const messages = {
  en: english,
  no: norwegian,
  nl: dutch,
  de: german,
  fr: french,
  fi: finish,
  es: spanish,
};

export default new VueI18n({
  fallbackLocale: "en",
  messages
});