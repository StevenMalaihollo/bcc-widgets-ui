import Vuex from 'vuex'
import Vue from 'vue'
import searchApi from '../utils/api/searchApi'
import config from '../config'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchQuery: '',
    searchResult: [],
    showResults: false    
  },
  actions: {
    async search() {
      this.state.searchResult = await searchApi.search(this.state.searchQuery);
      this.state.showResults = true;
    }
  },
  mutations: {
    setSearchQuery: (state, value) => {
      state.searchQuery = value;
    }
  },
  getters: {
      hideSearchBox: function(){
        return config.getScriptAttribute("hidesearchbox",false) == 'true'
      }
  }
});