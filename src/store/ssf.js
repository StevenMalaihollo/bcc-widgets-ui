import newsfeedApi from '../utils/api/newsfeedApi'
import Vuex from 'vuex'
import Vue from 'vue'
import i18n from '../utils/i18n'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ssfNews: [],
  },
  actions: {
    async loadSsfNews() {
      var newsEntries = await newsfeedApi.loadSsfNews();
      this.state.ssfNews = newsEntries.ssfPosts;
    }
  },
  getters: {
      ssfGrid: (state) => {
      return {
        title: i18n.t("newsfeed.ssf.title"),
        subtitle: i18n.t("newsfeed.ssf.subtitle"),
        posts: state.ssfNews,
        showPreferencesButton: false
      }
    },
  }
});