import Widget from "../widget";
import component from "../components/newsfeed/ssf.vue"
import store from "../store/ssf"

new Widget(component, "script-bcc-newsfeed", "bcc-ssfnewsfeed", { store: store });