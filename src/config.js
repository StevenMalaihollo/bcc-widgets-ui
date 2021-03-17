var keys = {
  deploymentTarget: process.env.deploymentTarget,
  localstorageKey: "bcc_widgets",
  currentElement: {
    scriptElementId: "initConfig_required",
    elementId: "initConfig_required"
  }
};

// set keys based on deployment environment
if (keys.deploymentTarget === "production") {
  keys.baseApiPath = "https://widgets.brunstad.org/api";
  keys.basePath = "https://widgets.bcc.no";
} else if (keys.deploymentTarget === "development") {
  keys.baseApiPath = "https://devwidgets.brunstad.org/api";
  keys.basePath = "https://devwidgets.bcc.no";
} else {
  //localhost by default
  keys.baseApiPath = "https://devwidgets.brunstad.org/api";
  keys.basePath = "http://localhost:59730";
}

function initConfig(scriptElementId, elementId) {
  keys.currentElement = {
    scriptElementId: scriptElementId,
    elementId: elementId
  };
}

// General
function getAccessTokenLocation() {
  var path = getDocument().getAttribute("data-authentication-location");

  if (path === null) {
    console.error(
      '[BCC Widget] cant load attribute "data-authentication-location"'
    );
  }
  return path;
}

function getAccessToken() {
  var path = getDocument().getAttribute("data-access-token");

  if (path === null) {
    console.error('[BCC Widget] cant load attribute "data-access-token"');
  }
  return path;
}

function getAuthenticationType() {
  var type = getDocument().getAttribute("data-authentication-type");
  if (type === null) {
    console.error(
      '[BCC Widget] cant load attribute "data-authentication-type"'
    );
  }
  return type;
}

function getDocument() {
  var element = document.getElementById(keys.currentElement.scriptElementId);
  if (element === null) {
    console.error(
      "[BCC Widget] cant find script with id: " +
      keys.currentElement.scriptElementId
    );
  }
  return element;
}

function getScriptAttribute(name, logErrorToConsole) {
  var res = getDocument().getAttribute("data-" + name);

  if (res === null && logErrorToConsole) {
    console.error("[BCC Widget] cant find attribute with name: data-" + name);
  }
  return res;
}

export default {
  keys,
  getAccessTokenLocation,
  getAuthenticationType,
  getAccessToken,
  initConfig,
  getScriptAttribute
};