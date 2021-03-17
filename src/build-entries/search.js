import Widget from "../widget";
import component from "../components/search/search.vue";
import store from "../store/search";

new Widget(component, "script-bcc-search", "bcc-search", { store: store });