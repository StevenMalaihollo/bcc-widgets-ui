import Widget from "../widget";
import component from "../components/newsfeed/newsfeed.vue"
import preferences from "../components/newsfeed/preferences.vue";
import store from "../store/newsfeed"
import BodyWidget from "../bodyWidget";

new Widget(component, "script-bcc-newsfeed", "bcc-newsfeed", { store: store });
new BodyWidget(preferences, "script-bcc-newsfeed", "bcc-newsfeed-preferences", { store: store});