import baseApi from "./baseApi.js";


/**
 * Get posts
 * @return {Promise}
 */
async function loadNews() {
  return await baseApi
    .sendRequest("get", baseApi.baseUri_bcc_no + "/newsfeed/overview")
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
      return undefined;
    });
}

async function loadSsfNews() {
  return await baseApi
    .sendRequest("get", baseApi.baseUri_bcc_no + "/newsfeed/ssfoverview")
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
      return undefined;
    });
}

/**
 * Get newsfeed preferences of user 
 * @return {Promise}
 */
async function preferences() {
  return await baseApi
    .sendRequest("get", baseApi.baseUri_bcc_no + "/newsfeed/preferences")
    .then(function(response) {
      return response.data.feeds;
    })
    .catch(function(error) {
      console.log(error);
      return undefined;
    });
}


/**
 * Save feed preferences of user
 * @return {Promise}
 */
async function saveFeedPreferences(feeds) {
  return await baseApi
    .sendRequest("post", baseApi.baseUri_bcc_no + "/newsfeed/preferences", {
      feeds
    })
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
      return undefined;
    });
}

export default {
  loadNews,
  preferences,
  saveFeedPreferences,
  loadSsfNews
};