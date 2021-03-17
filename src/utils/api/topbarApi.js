import baseApi from "./baseApi.js";
import store from "store"
import expirePlugin from "store/plugins/expire"

store.addPlugin(expirePlugin)

const cacheExpiration =  600000; //cache expiration for 10 minutes. 

/**
 * Get the user object
 * @return {Promise}
 */
async function user() {
  var cacheKey = 'BCC_Widgets_Topbar_User'
  var cachedResponse = store.get(cacheKey);

  if(cachedResponse !== undefined)
    return cachedResponse;

  return await baseApi
    .sendRequest("get", baseApi.baseUri_bcc_no + "/topbar/user")
    .then(function(response) {
      store.set(cacheKey, response.data, new Date().getTime() + cacheExpiration ) 
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
      return undefined;
    });
}

async function links() {
  var cacheKey = 'BCC_Widgets_Topbar_Links'
  var cachedResponse = store.get(cacheKey);

  if(cachedResponse !== undefined)
    return cachedResponse;

  return await baseApi
    .sendRequest("get", baseApi.baseUri_bcc_no + "/topbar/links")
    .then(function(response) {
      store.set(cacheKey, response.data, new Date().getTime() + cacheExpiration)
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
      return undefined;
    });
}

export default {
  user,
  links
};
