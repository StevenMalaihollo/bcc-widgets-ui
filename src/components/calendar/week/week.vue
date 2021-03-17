<template>
  <section class="bcc-widget-week list-widget">
    <weekHeader />

    <section class="content">
      <ul>
        <li
          v-for="day in days"
          :key="day.title"
        >
          <day :day="day" />
        </li>
      </ul>

      <weekFooter />
    </section>
  </section>
</template>

<script>
import weekHeader from './header.vue'
import day from './day.vue'
import weekFooter from './footer.vue'

import localeHelper from '../../../utils/localeHelper'
import store from "../../../store/calendar"

import calendarHelper from '../../../utils/calendarHelper'

import _collection from 'lodash/collection'
import { mapState, mapActions, mapGetters } from 'vuex';

import "@babel/polyfill/noConflict";

export default {
  components: {
    weekHeader,
    weekFooter,
    day
  },
  mounted: function () {
    this.loadEvents()
  },
  watch: {
  preferenceModalInFocus: async function (val) {
      if (val === false) {
        await this.loadEvents();
      }
    }
  },
  computed: {
    ...mapState([
      'events'
    ]),
    ...mapState('preferences', {
      preferenceModalInFocus: 'preferenceModalInFocus'
    }),
    days () {
      var eventsPerDay = this.groupEventsByDay(this.events);

      return _collection.map(eventsPerDay, function (value, key) {

        return { events: value, title: key };
      });
    }
  },
  methods: {
    ...mapActions({
      loadEvents: 'loadEvents'
    }),
    groupEventsByDay (events) {
      return _collection.groupBy(events, e => e.shownDate.toLocaleDateString(localeHelper.getDateLocale(), { weekday: 'long', day: 'numeric', month: 'long' }));
    }
  }

}
</script>
