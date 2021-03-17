import Widget from "../widget";
import BodyWidget from "../bodyWidget";
import component from "../components/calendar/month/month.vue"
import preferences from "../components/calendar/preferences/preferences.vue"
import store from "../store/calendar"

new Widget(component, "script-bcc-calendar-month", "bcc-calendar-month", { store: store });
new BodyWidget(preferences, "script-bcc-calendar-month", "bcc-calendar-month-preferences", { store: store });