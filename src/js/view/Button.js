import Widget from "./Widget.js";
const $ = require("jquery");

class Button extends Widget {
  constructor(text, account) {
    super();
    this.account = account;
    this.elem = $("<button></button>").text(text);
    this.addClass("uk-button uk-button-default uk-button-small");
    this.elem.click(this.onClick.bind(this));
  }

  onClick(evt) {
    var account = this.account;
    chrome.tabs.query({
      currentWindow: true,
      active: true
    }, function (tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, account, function (res) {
        console.log(res);
      });
    });
  }
}

export default Button;