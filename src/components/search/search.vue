<template>
  <section class="bcc-widget-search search-widget">
    <searchBar v-show="!hideSearchBox"/>

    <searchResult v-show="showResults"/> 
  </section>
</template>


<script>

import config from "../../config";

import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

import searchBar from "./searchbar.vue"
import searchResult from "./searchResult.vue"

export default {
    components: {
        searchBar,
        searchResult
    },
    methods: {
        ...mapActions({
            search: 'search'
        }),
        ...mapMutations({
            setSearchQuery: 'setSearchQuery'
        })
    },
    computed: {
        ...mapState({
            showResults: 'showResults'
        }),
        ...mapGetters({
            hideSearchBox: 'hideSearchBox'
        })
    },
    mounted: async function () {
        if(this.hideSearchBox){
            this.setSearchQuery(config.getScriptAttribute("searchquery",false))
            this.search();
        }
    }
}

</script>
