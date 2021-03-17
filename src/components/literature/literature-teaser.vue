<template>
    <a href="https://literature.bcc.no">
        <article class="literature-teaser">
            <h4>{{ $t("literature.teaser-title") }}</h4>
            <p class="small">{{ $t("literature.teaser-description") }}</p>
            <figure v-bind:style="{ 'background-image': 'url(' + this.teaserUrl + ')' }"></figure>
        </article>
    </a>
</template>


<script>
import config from "../../config";

export default {

  computed: {
    teaserUrl: function(){
        return config.keys.basePath + "/assets/literature_teaser.png";
    }
  }
};
</script>
