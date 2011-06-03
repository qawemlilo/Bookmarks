window.___jsl=window.___jsl||{};
window.___jsl.h=window.___jsl.h||'s;plusone:googleapis.client@21550740_8d71de52/client;googleapis.proxy@21550740_8d71de52/proxy;plusone:googleapis.client:iframes-styles-bubble@21550740_8d71de52/bubble;iframes-styles-bubble!plusone:googleapis.client@21550740_8d71de52/bubble_only;plusone-unsupported@21550740_8d71de52/unsupported';
window.___gpq=[];
window.gapi=window.gapi||{};
window.gapi.plusone=window.gapi.plusone||(function(){
  function f(n){return function(){window.___gpq.push(n,arguments)}}
  return{go:f('go'),render:f('render')}})();
function __bsld(){var p=window.gapi.plusone=window.googleapisv0.plusone;var f;while(f=window.___gpq.shift()){
  p[f]&&p[f].apply(p,window.___gpq.shift())}
if (gadgets.config.get("gwidget")["parsetags"]!=="explicit"){gapi.plusone.go();}}
/** @suppress {duplicate} */ var goog;window['___jsl'] = window['___jsl'] || {};window['___jsl']['u'] = 'https:\/\/apis.google.com\/js\/plusone.js';window['___jsl']['f'] = ['googleapis.client','plusone'];// Input 0
var jsloader = window["jsloader"] || {};

// Input 0
var gapi = window["gapi"] || {};

// Input 0
(function() {
  function toKey(reqFeatures, opt_loadFeatures) {
    var result = normalize(reqFeatures).join(":");
    opt_loadFeatures && opt_loadFeatures.length > 0 && (result += "!" + normalize(opt_loadFeatures).join(":"));
    return result
  }
  function toStaticKey(reqFeatures, opt_loadFeatures) {
    var result = normalize(reqFeatures).join("__");
    opt_loadFeatures && opt_loadFeatures.length > 0 && (result += "--" + normalize(opt_loadFeatures).join("__"));
    return result
  }
  function toSet(array) {
    for(var result = {}, i = 0;i < array.length;i++) {
      result[array[i]] = !0
    }
    return result
  }
  function isSubsetOfLoadedFeatures(features) {
    for(var set = toSet(loadedFeatures), isSubset = !0, i = 0;isSubset && i < features.length;i++) {
      isSubset = isSubset && set[features[i]]
    }
    return isSubset
  }
  function normalize(features) {
    var result = [], s;
    for(s in toSet(features)) {
      result.push(s)
    }
    return result.sort()
  }
  function isEnabledForInternal() {
    var jsl = window["___jsl"];
    return jsl && (jsl["m"] == "dev" || jsl["m"] == "google")
  }
  function setupCallback(opt_callback, opt_count) {
    var jsl = window["___jsl"];
    if(jsl && opt_callback && opt_count) {
      if(jsl["c"]) {
        throw"Cannot continue until a pending callback completes.";
      }
      jsl["c"] = opt_callback;
      jsl["o"] = opt_count
    }
  }
  function canLoadUrl(url) {
    if(type === "s" || type === "r") {
      return url.match(VALID_SCS_URL_REGEX)
    }
    return isEnabledForInternal() && url.match(VALID_GOOGLE_URL_REGEX)
  }
  function shouldLoadSync() {
    if(window["___gapisync"] === !0) {
      return!0
    }
    for(var metas = document.getElementsByTagName("meta"), i = 0;i < metas.length;++i) {
      var meta = metas[i];
      if("generator" == meta.getAttribute("name") || "blogger" == meta.getAttribute("content")) {
        return!0
      }
    }
    return!1
  }
  function loadUrl(url) {
    if(!canLoadUrl(url)) {
      throw"Cannot load url " + url + ".";
    }
    if(shouldLoadSync()) {
      document.write('<script src="' + url + '"><\/script>')
    }else {
      var script = document.createElement("script");
      script.setAttribute("src", url);
      document.getElementsByTagName("head")[0].appendChild(script)
    }
  }
  function handleLoadAndCallback(features, opt_url, opt_callback) {
    opt_url ? (setupCallback(opt_callback, 1), loadUrl(opt_url), updateLoadedFeatures(features)) : opt_callback && opt_callback()
  }
  function warn(values) {
    console && console.warn(values.join(""))
  }
  function normalizeKey(key) {
    var featureParts = key.split("!"), req = normalize(featureParts[0].split(":")), loaded = featureParts[1] && normalize(featureParts[1].split(":"));
    return toKey(req, loaded)
  }
  function initDescriptors(values) {
    for(var i = 0;i < values.length;i++) {
      var value = values[i], versionParts = value.split("@");
      descriptors[normalizeKey(versionParts[0])] = versionParts[1]
    }
  }
  function updateLoadedFeatures(features) {
    loadedFeatures = normalize(loadedFeatures.concat(features))
  }
  function processUrlFromMap(features) {
    var version = descriptors[toKey(features, loadedFeatures)];
    if(version) {
      return host + "/" + version + ".js"
    }else {
      warn(["Cannot find features [", features.join(","), "], except [", loadedFeatures.join(","), "]."])
    }
  }
  function processDynamicUrl(features) {
    var url = host + "/" + toKey(features, loadedFeatures);
    url += ".js?container=" + container + "&c=2";
    repository && (url += "&r=" + repository);
    return url
  }
  function processRepositoryUrl(features) {
    return host + "/" + repository + "/" + toStaticKey(features, loadedFeatures) + ".js"
  }
  function getLastHint(pattern) {
    var r = parentUrl.match(pattern);
    return r && r[r.length - 1]
  }
  function getUrlHint() {
    return getLastHint(QUERY_PATTERN) || getLastHint(FRAGMENT_PATTERN)
  }
  function getGlobalHint() {
    var jsl = window["___jsl"];
    return jsl && jsl["h"]
  }
  function initialize(url) {
    host = type = 0;
    descriptors = {};
    loadedFeatures = [];
    console = window.console || window.opera && window.opera.postError;
    parentUrl = url;
    var hint = getUrlHint() || getGlobalHint();
    if(hint) {
      var parts = hint.split(";");
      type = parts[0];
      type === "s" ? (host = "https://ssl.gstatic.com/webclient/js", initDescriptors(parts.slice(1))) : type === "i" ? (host = parts[1], initDescriptors(parts.slice(2))) : type === "d" ? (host = parts[1], repository = parts[2], container = parts[3] || "gcjs-3p") : type === "r" ? (host = "https://ssl.gstatic.com/webclient/js", repository = parts[1]) : type === "f" && (host = parts[1], repository = parts[2])
    }
  }
  var QUERY_PATTERN = /\?[&|(\S*=\S*&)]*jsh=(\S*)#?/, FRAGMENT_PATTERN = /#[&|(\S*=\S*&)]*jsh=(\S*)/, VALID_SCS_URL_REGEX = /^https:\/\/ssl.gstatic.com\/webclient\/js(\/[a-zA-Z0-9_\-]+)*\/[a-zA-Z0-9_\-\.:!]+\.js$/, VALID_GOOGLE_URL_REGEX = RegExp("^(http:|https:)?(\\/\\/)?([a-zA-Z0-9_\\-]+\\.)*google\\.com(:[0-9]+)?(\\/[a-zA-Z0-9_\\-]+)*\\/[a-zA-Z0-9_\\-\\.:!]+\\.js(\\?[a-zA-Z0-9_\\-&=%]*)?$"), type, host, container, repository, descriptors, loadedFeatures, console, parentUrl;
  initialize(document.location.href);
  jsloader.load = function(features, opt_callback) {
    var urlToLoad;
    !features || features.length == 0 ? warn(["Cannot load empty features."]) : isSubsetOfLoadedFeatures(features) ? warn(["Cannot load loaded features [", features.join(","), "]."]) : type === "s" || type === "i" ? urlToLoad = processUrlFromMap(features) : type === "d" ? urlToLoad = processDynamicUrl(features) : type === "r" || type === "f" ? urlToLoad = processRepositoryUrl(features) : warn(["Cannot respond for features [", features.join(","), "]."]);
    handleLoadAndCallback(features, urlToLoad, opt_callback)
  };
  jsloader.reinitialize_ = function(url) {
    initialize(url)
  }
})();

// Input 0
gapi.load = function(features, opt_callback) {
  jsloader.load(features.split(":"), opt_callback)
};

gapi.load('googleapis.client:plusone', window['__bsld']);