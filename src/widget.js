import "@babel/polyfill/noConflict";
import './css/widgets.css'
import Vue from "vue";
import vClickOutside from "v-click-outside";

import i18n from "./utils/i18n"
import localeHelper from "./utils/localeHelper"
import config from "./config";

/**
 * This class is being used by all the widgets in the 'build-entries' folder. 
 */
export default class Widget {
  constructor(component, scriptElementId, componentElementId, vueOptions) {
    Vue.use(vClickOutside);

    config.initConfig(scriptElementId, componentElementId)

    i18n.locale = localeHelper.getAppLanguage(),

      this.getElementId().then((elementId) => {
        new Vue({
          i18n,
          el: elementId,
          render: h => h(component),
          ...vueOptions
        });
      })

  }

  /**
   * Promise-based, because some widgets require to wait until body is rendered. 
   */
  getElementId() {
    return new Promise((resolve, reject) => {
      resolve("#" + config.keys.currentElement.elementId)
    });
  }
};