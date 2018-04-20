(function() {
  const $ = require("jquery");
  console.log("Content js is loaded");
  chrome.runtime.onMessage.addListener(function(req, sender, res) {
    var p = $("<p></p>").text(req.eth);
    $("body").append(p);
  });
})();
