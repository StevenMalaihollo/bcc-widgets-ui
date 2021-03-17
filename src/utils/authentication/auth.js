import store from "store";
import expirePlugin from "store/plugins/expire";
import config from "../../config";

import WebApp from './auth-WebApp';
import SPA from './auth-SPA'
import Inline from './auth-inline'


function getAccessToken() {
  var authenticationMode = config.getAuthenticationType().toLowerCase();
 switch(authenticationMode){
    case 'webapp':
      return WebApp.getAccessToken();
  
    case 'spa': 
      return SPA.getAccessToken();

    case 'inline-access-token':
      return Inline.getAccessToken();

    default: 
      return Promise.reject('Authentication mode not supported')
      break;
 }
}

export default {
  getAccessToken
};


