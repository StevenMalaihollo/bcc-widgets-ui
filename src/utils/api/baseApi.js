import axios from "axios";
import auth from "../authentication/auth";
import config from "../../config";

const baseUri_brunstad_org = config.keys.baseApiPath;
const baseUri_bcc_no = config.keys.basePath + '/api';

var getAccessTokenPromise;

/**
 * Sets the bearer authentication token for each request.
 */
async function defineHeader() {
  if (getAccessTokenPromise === undefined) {
    getAccessTokenPromise = auth
      .getAccessToken()
      .then(
        accessToken => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + accessToken;
          return true;
        },
        err => {
          console.error(err);
          return false;
        }
      )
      .finally(function() {
        getAccessTokenPromise = undefined;
      });
  }

  return await getAccessTokenPromise;
}

/**
 * Create and process the request
 */
async function sendRequest(requestMethod, requestUrl, requestBody) {
  var accesstoken = await defineHeader();

  if (!accesstoken)
    return Promise.reject('could not get accesstoken');

  return axios({
    method: requestMethod,
    url: requestUrl,
    data: requestBody
  });
}

export default {
  sendRequest,
  baseUri_brunstad_org,
  baseUri_bcc_no
};