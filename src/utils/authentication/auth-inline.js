import config from "../../config";

function getAccessToken() {

  return new Promise((resolve, reject) => {
    var accessToken = config.getAccessToken();
  
    if(accessToken === undefined)
      return reject('AccessToken could not be found in script tag');
  
    return resolve(accessToken);
  });

}
export default {
  getAccessToken
};
