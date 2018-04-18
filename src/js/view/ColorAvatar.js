import Widget from "./Widget";
const blockies = require("../lib/blockies");
const $ = require("jquery");

class ColorAvatar extends Widget {
  constructor(id) {
    super();
    this.id = id;
    let option = {
      seed: id,
      size: 6,
      scale: 6
    };
    let icon = $(blockies.create(option));
    icon.addClass("border-radius-18");
    this.elem = $("<div></div>").append(icon);
  }
}

export default ColorAvatar;