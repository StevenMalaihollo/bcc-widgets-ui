import newsfeedApi from '../utils/api/newsfeedApi'
import preferences from './preferences'
import Vuex from 'vuex'
import Vue from 'vue'
import i18n from '../utils/i18n'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    preferences
  },
  state: {
    localChurchName: '',
    localNews: [],
    favoriteNews: [],
    worldNews: [],
  },
  actions: {
    async loadAllNews() {
      var newsEntries = await newsfeedApi.loadNews();

      this.state.localChurchName = newsEntries.localChurchName;
      this.state.localNews = newsEntries.localChurchPosts;
      this.state.favoriteNews = newsEntries.favoriteFeedposts;
      this.state.worldNews = newsEntries.wordWidePosts;
    }
  },
  getters: {
    localGrid: (state) => {
      return {
        title: i18n.t("newsfeed.local.title"),
        subtitle: i18n.t("newsfeed.local.subtitle") + " " + state.localChurchName,
        posts: state.localNews,
        showPreferencesButton: false
      }
    },
    favoriteGrid : (state) => {
      return {
        title: i18n.t("newsfeed.favorite.title"),
        subtitle: i18n.t("newsfeed.favorite.subtitle", { localChurchName: state.localChurchName }),
        posts: state.favoriteNews,
        showPreferencesButton: true
      }
    },
    worldGrid: (state) => {
      return {
        title: i18n.t("newsfeed.worldwide.title"),
        subtitle: i18n.t("newsfeed.worldwide.subtitle"),
        posts: state.worldNews,
        showPreferencesButton: false
      }
    },
  }
});