import Widget from "./Widget.js";
const $ = require("jquery");

class Button extends Widget {
  constructor(text) {
    super();
    this.elem = $("<button></button>").text(text);
    this.addClass("uk-button uk-button-default uk-button-small");
    this.elem.click(this.onClick.bind(this));
  }

  onClick(evt) {
    console.log(evt);
    // send the data that is pointed by this button to content script.
    var data = {
      email: "hungtin.bk12@gmail.com",
      eth: "0x827b26dd4ca03dd6d5ea68db43c9688f07d24d53",
      firstName: "Tin",
      lastName: "Trinh"
    };

    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, data, function(res) {
        console.log(res);
      });
    });
    console.log("Click on me");
  }
}

export default Button;
