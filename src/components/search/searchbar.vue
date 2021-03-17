<template>
  <section class="search">
    <h3>{{$t('search.person-title')}}</h3>
    <input
      type="text"
      class="search-input"
      v-model="query"
      v-bind:title="$t('search.input-title')"
      v-bind:placeholder="$t('search.input-placeholder')"
      v-on:keyup.enter="search"
    >
  </section>
</template>

<script>
import store from "../../store/search"
import { mapMutations, mapActions } from 'vuex';

export default {
    computed: {
    query: {
      get () {
        return this.$store.state.searchQuery
      },
      set (value) {
        this.setSearchQuery(value);
      }
    }
  },
  methods: {
    ...mapMutations({
      setSearchQuery: 'setSearchQuery'
    }),
    ...mapActions({search:'search'})

  }
}
</script>