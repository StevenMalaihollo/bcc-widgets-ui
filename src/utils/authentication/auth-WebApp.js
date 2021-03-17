import axios from "axios";
import store from "store";
import config from "../../config";
import dumpPlugin from "store/plugins/dump";
import jwtDecode from "jwt-decode";

store.addPlugin(dumpPlugin);

function requestBackendAccessToken() {
  return axios({
    method: "get",
    url: config.getAccessTokenLocation(), // Safari fix
    withCredentials: true
  });
}

function getAccessToken() {
  return new Promise((resolve, reject) => {
    var widgetStorage = store.get(config.keys.localstorageKey);

    var accessToken = widgetStorage && widgetStorage.accessToken;

    var isValid = accessToken && jwtDecode(accessToken).exp > Date.now() / 1000;
    if (isValid) {
      return resolve(accessToken);
    } else {
      requestBackendAccessToken()
        .then(function(response) {
          accessToken = response.data;
          var decoded = jwtDecode(accessToken);
          if (decoded.exp !== undefined) {
            store.set(config.keys.localstorageKey, {
              accessToken: accessToken
            });

            return resolve(accessToken);
          } else {
            return reject("result is not an accesstoken");
          }
        })
        .catch(function(error) {
          return reject(error);
        });
    }
  });
}
export default {
  getAccessToken
};
