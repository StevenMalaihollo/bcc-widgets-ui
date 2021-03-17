<template>
  <div id="bcc-widget-topbar">
    <div class="portal-top-bar-spacer"/>
    <section class="portal-top-bar">
      <a href="https://portal.bcc.no" class="portal-button"></a>
      <searchBar></searchBar>
      <profileButton :displayName="displayName"></profileButton>
    </section>
  </div>
</template>

<script>
import searchBar from "./searchbar.vue";
import profileButton from "./profileButton.vue";
import topbarApi from "../../utils/api/topbarApi";

export default {
  props: {
    appTitle: {
      type: String,
      required: false,
      default: ""
    }
  },
  data: function() {
    return {
      displayName: ''
    };
  },

  mounted: async function() {
    var user = await topbarApi.user();

    if (user !== undefined){
      this.displayName = user.displayName;
      this.$i18n.locale = user.portalLanguage;
    }
      
  },
  components: {
    searchBar,
    profileButton
  }
};
</script>
