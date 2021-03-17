import config from "../config"

function getDateLocale() {
  return getAppLanguage() === 'no' ? 'nb' : getAppLanguage();
}

function getAppLanguage() {
  return config.getScriptAttribute('language', false) || 'en';
}

export default {
  getAppLanguage,
  getDateLocale
}