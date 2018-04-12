import "../css/popup.css";

import hello from "./popup/example";
import Text from "./view/Text";
import VerticalList from "./view/VerticalList";
import ColorAvatar from "./view/ColorAvatar";
import Button from "./view/Button";

const $ = require("jquery");

var app = $("#app");

var hello = new Text("Hello");
hello.addClass("text-bold");

var hello2 = new Text("Hello");
hello2.addClass("text-bold");

var helloJP = new Text("Hello JP");
var helloUS = new Text("Hello US");
var colorAvatar = new ColorAvatar("trinh hung tin");
var button = new Button();

var list = new VerticalList([hello2, helloJP, helloUS]);
hello.render(app);
list.render(app);
colorAvatar.render(app);
