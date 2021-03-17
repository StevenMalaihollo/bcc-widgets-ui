import baseApi from "./baseApi.js";
import localeHelper from "../localeHelper.js"
import config from "../../config.js"

async function search(query) {
  return await baseApi
    .sendRequest("get", baseApi.baseUri_bcc_no + "/search?q=" + query )
    .then(function (response) {
      return response.data.personSearchResult;
    })
    .catch(function(error) {
      console.log(error);
      return undefined;
    });
}

export default {
    search
};