import calendarApi from '../utils/api/calendarApi'
import Vuex from 'vuex'
import Vue from 'vue'
import config from '../config'
import preferences from './preferences';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    preferences
  },
  state: {
    events: []
  },
  actions: {
    async loadEvents() {
      this.state.events = await calendarApi.upcommingEvents();
    }
  },
  getters: {
    showSettingsButtons: () => {
      return config.getScriptAttribute('calendars').includes('user_preference');
    }
  }
});