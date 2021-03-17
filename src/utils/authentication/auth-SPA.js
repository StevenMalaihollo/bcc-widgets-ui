import config from "../../config";
import store from "store";
import dumpPlugin from "store/plugins/dump";
import get from 'get-value';

store.addPlugin(dumpPlugin)

function getAccessToken() {
  return new Promise((resolve, reject) => {
    var localstorage = store.dump();
    var accessToken = get(localstorage, config.getAccessTokenLocation());

    if(accessToken === undefined)
      return reject('AccessToken could not be found in localstorage');
    
    return resolve(accessToken);
  });
}
export default {
  getAccessToken
};
