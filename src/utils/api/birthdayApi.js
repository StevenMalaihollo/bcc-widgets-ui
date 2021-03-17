import baseApi from "./baseApi.js";
import localeHelper from "../localeHelper.js"
import config from "../../config.js"
async function upcomingDates() {
  return await baseApi
    .sendRequest("get", baseApi.baseUri_bcc_no +
        "/birthday/upcoming" +
        "?churchName=" + config.getScriptAttribute("churchname") +
        "&clientDate=" + new Date().toISOString() +
        "&maxDays=" + config.getScriptAttribute("maxdays")
    )
    .then(function (response) {
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
      return undefined;
    });
}

export default {
    upcomingDates
};