<template>
  <section class="search" v-click-outside="() => updateFocus(false)">
    <input
      type="text"
      class="search-field"
      v-bind:title="$t('search.input-title')"
      v-bind:placeholder="$t('search.input-placeholder')"
      @click="updateFocus(true)"
      v-model="searchQuery"
    >
    <section class="search-list dropdown-list" v-bind:class="{'open' : (this.componentInFocus)}">
      <div v-if="searchQuery !== ''">
        <h6>{{ $t("search.results-content-title") }}:</h6>

        <ul>
          <li>    
            <a v-bind:href="'https://literature.bcc.no/search/q='+ searchQuery">
            	<img src="../../assets/icon_search_blue.svg">
              {{ $t('search.search-literature', {searchQuery: this.searchQuery})}}
            </a>
          </li>
          <li>
            <a v-bind:href="'https://bmm.brunstad.org/playlist/search/'+ searchQuery">
            <img src="../../assets/icon_search_blue.svg">
              {{ $t('search.search-BMM', {searchQuery: this.searchQuery})}}
            </a>
          </li>
          <li>
            <a v-bind:href="'https://portal.bcc.no/?s='+ searchQuery">
            	<img src="../../assets/icon_search_blue.svg">
              {{ $t('search.search-portal', {searchQuery: this.searchQuery})}}
            </a>
          </li>
        </ul>
      </div>
      
      <h6>{{ $t("search.results-websites-title") }}:</h6>
      <ul>
        <li v-for="link in filteredLinks" :key="link.name">
          <searchResult :link="link"/>
        </li>

        <li v-if="filteredLinks.length === 0">
          <h6>{{ $t('search.results-no-websites-found')}}</h6>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import topbarApi from "../../utils/api/topbarApi";
import searchHelper from "../../utils/searchHelper";
import searchResult from "./search-result.vue";

export default {
  components: {searchResult},
  props: ["element"],
  data: function() {
    return {
      componentInFocus: false,
      searchQuery: "",
      links: []
    };
  },
  computed: {
    filteredLinks: function() {
      var searchQuery = this.searchQuery.toLowerCase();

      return searchHelper.getFilteredLinks(this.links, searchQuery);
    }
  },
  mounted: async function() {
    var links = await topbarApi.links();

    if (links !== undefined) this.links = links;
  },
  methods: {
    updateFocus: function(isInFocus) {
      this.componentInFocus = isInFocus;
    }
  }
};
</script>
