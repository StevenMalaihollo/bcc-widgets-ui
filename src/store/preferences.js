export default {
  namespaced: true,
  state: {
    searchQuery: '',
    preferenceModalInFocus: false,
  },
  mutations: {
    setSearchQuery: (state, value) => {
      state.searchQuery = value;
    },
    setPreferenceModalInFocus: (state, value) => {
      state.preferenceModalInFocus = value;
    }
  },
}