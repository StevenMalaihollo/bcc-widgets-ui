<template>
  <Preferences 
    :listHeader="listTitle"
    :saveFunction="saveChanges">
    <template v-slot:timezone>
      <h4>{{ $t("calendar.preferences.timezone") }}</h4>
      <section class="timezone">
        <select v-model="selectedTimezone">
          <option v-for="timezone in timezones" v-bind:key="timezone">
            {{ timezone}}
          </option>
        </select>
      </section>
    </template>
    <template v-slot:list>
      <feedCategory v-bind:title="$t('preferences.sections.local')" :feeds="localFeeds"/>
      <feedCategory v-bind:title="$t('preferences.sections.church')"  :feeds="churchFeeds"/>
      <feedCategory v-bind:title="$t('preferences.sections.music')"  :feeds="musicFeeds"/>
      <feedCategory v-bind:title="$t('preferences.sections.recreation')"  :feeds="recreationFeeds"/>
      <feedCategory v-bind:title="$t('preferences.sections.sport')"  :feeds="sportFeeds"/>
    </template>
  </Preferences>
 
</template>

<script>
import Preferences from "../../preferences/preferences.vue"
import feedCategory from "../../preferences/feed-category.vue"

import calendarApi from "../../../utils/api/calendarApi"
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    Preferences,
    feedCategory
  },
  data: function () {
    return {
      feeds: [],
      timezones: [],
      selectedTimezone: ''
    };
  },
  computed: {
    ...mapState('preferences', {
      preferenceModalInFocus: 'preferenceModalInFocus'
    }),
    listTitle() {
      return this.$t("calendar.preferences.calendar-list");
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
  },
  methods: {
    async saveChanges () {
      var feeds = this.feeds.filter(feed => feed.changed).map(feed => {
        return { feedId: feed.feedId, Active: feed.active }
      });
      await calendarApi.saveFeedPreferences(feeds, this.selectedTimezone);
    },
    ...mapActions({
      loadEvents: 'loadEvents',
    }),
  },
  watch: {
    preferenceModalInFocus: async function (val) {
      if (val === true) {
        var preferences = await calendarApi.preferences();
        this.feeds = preferences.feeds;
        this.timezones = preferences.timeZones.sort();
        this.selectedTimezone = preferences.selectedTimeZone;
      }

    }
  }

}
</script>
