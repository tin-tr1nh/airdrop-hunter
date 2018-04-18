import "../css/popup.css";

import hello from "./popup/example";
import Text from "./view/Text";
import VerticalList from "./view/VerticalList";
import ColorAvatar from "./view/ColorAvatar";
import Button from "./view/Button";
import HorizontalList from "./view/HorizontalList";
import "uikit/dist/css/uikit.css";

const $ = require("jquery");
const sha256 = require("js-sha256").sha256;

var app = $("#app");

var hello2 = new Text("Hello");
var helloJP = new Text("Hello JP");
var helloUS = new Text("Hello US");

var accounts = [
  "hungtin.bk12@gmail.com",
  "hide.atware@gmail.com",
  "trinh.tin@gmail.com",
  "toriumikun.yamadasahamotokori@hamee.co.jp",
  "satoukejisan.marimotomori@gmail.com"
];
var accountVerticalList = new VerticalList([]);
accounts.forEach(account => {
  var avt = new ColorAvatar(sha256(account));
  var button = new Button("USE");
  var text = new Text(account);

  avt.addClass("flex-basic-0 flex-grow-1 cursor-pointer");
  text.addClass("flex-basic-0 flex-grow-3 margin-0 break-word width-100");
  button.addClass("use-button flex-basic-0 flex-grow-1");

  var hlist = new HorizontalList([avt, text, button]);
  hlist.addClass("margin-10");

  accountVerticalList.addItem(hlist);
});

accountVerticalList.render(app);