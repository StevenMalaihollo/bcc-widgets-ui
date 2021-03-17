<template>
  <section class="search">
    <input
      type="text"
      class="search-field"
      v-model="query"
      v-bind:title="$t('search.input-title')"
      v-bind:placeholder="$t('search.input-placeholder')"
    >
  </section>
</template>

<script>
import { mapMutations } from 'vuex';

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
    ...mapMutations('preferences', {
      setSearchQuery: 'setSearchQuery'
    })
  }
}
</script>

