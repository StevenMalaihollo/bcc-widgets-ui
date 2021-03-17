import baseApi from "./baseApi.js";

async function scheduledItems() {
  return await baseApi
    .sendRequest("get", baseApi.baseUri_bcc_no + "/tvguide/scheduled-items")
    .then(function (response) {
      return response.data
    })
    .catch(function(error) {
      console.log(error);
      return undefined;
    });
}

export default {
  scheduledItems
};