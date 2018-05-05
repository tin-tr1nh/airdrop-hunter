import "../css/popup.css";

import Text from "./view/Text";
import VerticalList from "./view/VerticalList";
import ColorAvatar from "./view/ColorAvatar";
import Button from "./view/Button";
import HorizontalList from "./view/HorizontalList";
import "uikit/dist/css/uikit.css";
import Model from "./model";

const $ = require("jquery");
const sha256 = require("js-sha256").sha256;

var app = $("#app");

var accountVerticalList = new VerticalList([]);
Model.loadAccounts().then(function (res) {
  res.forEach(account => {
    var avt = new ColorAvatar(sha256(account.email));
    var useButton = new Button("USE");
    var emailText = new Text(account.email);

    avt.addClass("flex-basic-0 flex-grow-1 cursor-pointer");
    emailText.addClass("flex-basic-0 flex-grow-3 margin-0 break-word width-100");
    useButton.addClass("use-button flex-basic-0 flex-grow-1");
    useButton.addClickListener((function (account) {
      return function () {
        chrome.tabs.query({
          currentWindow: true,
          active: true
        }, function (tabs) {
          var activeTab = tabs[0];
          chrome.tabs.sendMessage(activeTab.id, account, function (res) {});
        });
      }
    })(account));

    var item = new HorizontalList([avt, emailText, useButton]);
    item.addClass("uk-card uk-card-default uk-card-hover uk-card-body uk-padding-small margin-10");

    accountVerticalList.addItem(item);
  });

  accountVerticalList.render(app);
});