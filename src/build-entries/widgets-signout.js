import store from "store";
import config from "../config";
import "@babel/polyfill";

var clearLocalStorage = function() {
  // remove all entries that start with the localstorageKey
  store.each(function(value, key) {
    if (key.toLocaleLowerCase().includes(config.keys.localstorageKey)) {
      store.remove(key);
    }
  });
};

// TODO this signout does not work with ITP enabled on safari.
export default new clearLocalStorage();