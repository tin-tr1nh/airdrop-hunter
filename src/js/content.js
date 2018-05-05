import Model from "./model";

(function () {
  const $ = require("jquery");
  var airdrop = Model.loadAirdrops();
  chrome.runtime.onMessage.addListener(function (req, sender, res) {
    var xPathObj = findCurrentPageXPathObj(airdrop);
    if (xPathObj == undefined) {
      alert("There is no info about this airdrop");
      return;
    }
    fillInput(xPathObj, req);
  });

  function fillInput(xPathObj, accountInfo) {
    for (var key in xPathObj) {
      if (xPathObj.hasOwnProperty(key)) {
        if (accountInfo[key] == undefined) {
          continue;
        }
        $(xPathObj[key]).val(accountInfo[key]);
      }
    }
  }

  function findCurrentPageXPathObj(xPaths) {
    var url = location.href;
    return xPaths.find(function (xPath) {
      return xPath.url == url;
    });
  }

})();
console.log("air-hunt js is loaded");