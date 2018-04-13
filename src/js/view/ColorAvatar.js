import Widget from "./Widget";
const blockies = require("../lib/blockies");
const $ = require("jquery");

class ColorAvatar extends Widget {
  constructor(id) {
    super();
    this.id = id;
    let option = {
      seed: id,
      size: 8,
      scale: 8
    };
    let icon = $(blockies.create(option));
    icon.addClass("border-radius-32");

    this.elem = icon;
  }
}

export default ColorAvatar;
