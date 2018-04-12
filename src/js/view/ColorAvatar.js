import Widget from "./Widget";
const blockies = require("../lib/blockies");
const $ = require("jquery");

class ColorAvatar extends Widget {
  constructor(id) {
    super();
    this.addClass("border-radius-30");
    this.id = id;
    let option = {
      seed: id,
      size: 10,
      scale: 6
    };
    let icon = blockies.create(option);
    this.elem = $(icon);
  }
}

export default ColorAvatar;
