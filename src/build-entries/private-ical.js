import component from "../components/calendar/ical/ical.vue"
import Widget from "../widget";
import Vue from "vue";
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

new Widget(component, "script-bcc-private-ical", "bcc-private-ical");