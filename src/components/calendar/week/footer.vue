<template>
  <section>
    <a
      :href="fullCalendarUrl"
      class="button"
    >
      {{ $t("calendar.week.showFullCalendar") }}
    </a>

    <section class="settings" v-show="showSettingsButtons">
      <button
        class="button small"
        @click="setPreferenceModalInFocus(true)"
      >
        {{ $t("preferences.title") }}   
      </button>
      <a
        href="https://portal.bcc.no/en/kalender/icalendar/"
        class="button small"
      >
        {{ $t("calendar.preferences.add-to-mobile") }}   
      </a>
    </section>
  </section>
</template>

<script>
import config from "../../../config"
import calendarHelper from "../../../utils/calendarHelper"

import { mapState, mapMutations, mapGetters} from 'vuex';


export default {
  computed: {
    fullCalendarUrl(){
      return config.getScriptAttribute('fullcalendarurl') || 'https://portal.bcc.no/kalender/';
    },
    ...mapGetters(['showSettingsButtons'])
  },
  methods: {
     ...mapMutations('preferences', {
      setPreferenceModalInFocus: 'setPreferenceModalInFocus'
     }),
  }
  
}
</script>
