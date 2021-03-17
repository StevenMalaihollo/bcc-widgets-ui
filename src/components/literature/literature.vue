<template>

  <section class="bcc-widget-literature literature-widget">
    <section class="container">
      <literatureTeaser/>
        <section class="subscriptions-grid">
          <subscription v-for="subscription in subscriptions" 
                        :key="subscription.title"
                        :subscription=subscription />
        </section>
    </section>
  </section>
</template>

<script>
import literatureTeaser from "./literature-teaser.vue";
import subscription from "./subscription.vue"


import subscriptionApi from "../../utils/api/subscriptionApi";
import localeHelper from "../../utils/localeHelper";

export default {
  mounted: async function() {
    var subscriptions = await subscriptionApi.subscriptions();
    this.subscriptions = subscriptions
    },

  data: function() {
    return {
      subscriptions: [ ]
    };
  },

  components: {
    literatureTeaser,
    subscription
  }
};
</script>
