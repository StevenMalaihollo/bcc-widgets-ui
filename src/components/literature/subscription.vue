<template>
  <article class="subscription" v-bind:class="{'active' : (this.subscription.userIsSubscribed)}">
    <div v-if="subscription.userIsSubscribed">
      <h5>{{ $t("literature.subscribed-on-publication") }}</h5>
      <h4>{{this.subscription.title}}</h4>
      <a :href="subscription.publicationUrl" class="button-secondary small">{{ $t("literature.navigate-to-publication") }}</a>
      <a :href="subscription.lastPublicationUrl" class="latest">
        <figure
          v-bind:style="{ 'background-image': 'url(' + this.subscription.coverImageUrl + ')' }"
        ></figure>
        <h6>{{ $t("literature.latest-issue") }}</h6>
        <h4>{{this.subscription.lastPublicationTitle}}</h4>
      </a>
    </div>

    <div v-else>
      <h5>{{ $t("literature.subscribe-to-publication") }}</h5>
      <h4>{{this.subscription.title}}</h4>
      <figure v-bind:style="{ 'background-image': 'url(' + this.subscription.coverImageUrl + ')' }"></figure>
      <div class="signup-cta">
        <a :href="subscription.publicationUrl" class="button-main small">{{ $t("literature.navigate-to-signup-form") }}</a>
      </div>
    </div>
  </article>
</template>


<script>
export default {
  props: ["subscription"]
};
</script>
