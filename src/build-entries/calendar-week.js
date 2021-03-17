import Widget from "../widget";
import BodyWidget from "../bodyWidget";
import component from "../components/calendar/week/week.vue";
import preferences from "../components/calendar/preferences/preferences.vue";
import store from "../store/calendar";

new Widget(component, "script-bcc-calendar-week", "bcc-calendar-week", { store: store });
new BodyWidget(preferences, "script-bcc-calendar-week", "bcc-calendar-week-preferences", { store: store });