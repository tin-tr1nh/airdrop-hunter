import "../css/popup.css";

import hello from "./popup/example";
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
Model.loadAccounts().forEach(account => {
  var avt = new ColorAvatar(sha256(account.email));
  var useButton = new Button("USE", account);
  var emailText = new Text(account.email);

  avt.addClass("flex-basic-0 flex-grow-1 cursor-pointer");
  emailText.addClass("flex-basic-0 flex-grow-3 margin-0 break-word width-100");
  useButton.addClass("use-button flex-basic-0 flex-grow-1");

  var item = new HorizontalList([avt, emailText, useButton]);
  item.addClass("margin-10");

  accountVerticalList.addItem(item);
});

accountVerticalList.render(app);