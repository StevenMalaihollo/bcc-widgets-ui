<template>
  <Preferences 
    :listHeader="listTitle"
    :saveFunction="saveChanges">
    <template v-slot:list>
              <feedCategory v-bind:title="$t('preferences.sections.local')" :feeds="localFeeds"/>
              <feedCategory v-bind:title="$t('preferences.sections.brunstad')"  :feeds="brunstadFeeds"/>
              <feedCategory v-bind:title="$t('preferences.sections.church')"  :feeds="churchFeeds"/>
              <feedCategory v-bind:title="$t('preferences.sections.music')"  :feeds="musicFeeds"/>
              <feedCategory v-bind:title="$t('preferences.sections.recreation')"  :feeds="recreationFeeds"/>
              <feedCategory v-bind:title="$t('preferences.sections.sport')"  :feeds="sportFeeds"/>
              <feedCategory v-bind:title="$t('preferences.sections.other')"  :feeds="otherFeeds"/>
    </template>
  </Preferences>
 
</template>

<script>
import Preferences from "../preferences/preferences.vue"
import feedCategory from "../preferences/feed-category.vue"

import newsfeedApi from "../../utils/api/newsfeedApi"
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    Preferences,
    feedCategory
  },
  data: function () {
    return {
      feeds: [],
    };
  },
  computed: {
    ...mapState('preferences', {
      preferenceModalInFocus: 'preferenceModalInFocus'
    }),
    listTitle() {
      return this.$t("newsfeed.preferences.newsfeed-list");
    },
    localFeeds () {
      return this.feeds.filter(feed => feed.section === 'local');
    },
    churchFeeds () {
      return this.feeds.filter(feed => feed.section === 'church');
    },
    musicFeeds () {
      return this.feeds.filter(feed => feed.section === 'music');
    },
    recreationFeeds () {
      return this.feeds.filter(feed => feed.section === 'recreation');
    },
    sportFeeds () {
      return this.feeds.filter(feed => feed.section === 'sport');
    },
    brunstadFeeds () {
      return this.feeds.filter(feed => feed.section === 'brunstad');
    },
    otherFeeds () {
      return this.feeds.filter(feed => feed.section === null);
    },
  },
  methods: {
    async saveChanges () {
       var feeds = this.feeds.filter(feed => feed.changed).map(feed => {
        return { feedId: feed.feedId, Active: feed.active }
      });
      await newsfeedApi.saveFeedPreferences(feeds);
    },
    ...mapActions({
      loadEvents: 'loadEvents',
    }),
  },
  watch: {
    preferenceModalInFocus: async function (val) {
      if (val === true) {
        this.feeds = await newsfeedApi.preferences();
      }

    }
  }

}
</script>
