<template>
  <a :href="link.url">
    <img :src="getIconUrl(link)">
    {{ link.displayname }}
  </a>
</template>

<script>
import config from "../../config";

export default {
  props: ["link"],

  methods: {
     getIconUrl: function(link){
      if(link.countryId){
        return config.keys.basePath + "/assets/flag/" + link.countryId + ".png";
      } else {
        return config.keys.basePath + '/assets/icon_generic.svg';
      }
    }
  },
}
</script>