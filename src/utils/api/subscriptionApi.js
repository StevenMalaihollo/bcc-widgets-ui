import baseApi from "./baseApi.js";
import store from "store"
import expirePlugin from "store/plugins/expire"
import localeHelper from "../localeHelper"

store.addPlugin(expirePlugin)

const cacheExpiration =  600000; //cache expiration for 10 minutes. 

/**
 * Get the user object
 * @return {Promise}
 */
async function subscriptions() {
  var cacheKey = 'BCC_Widgets_Literature_Subscriptions'
  var cachedResponse = store.get(cacheKey);

  if(cachedResponse !== undefined)
    return cachedResponse;

  return await baseApi
    .sendRequest("get", baseApi.baseUri_bcc_no + "/Literature/Subscriptions?lang=" + localeHelper.getAppLanguage())
    .then(function(response) {
      store.set(cacheKey, response.data.data, new Date().getTime() + cacheExpiration ) 
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
      return undefined;
    });
}

export default {
  subscriptions
};
