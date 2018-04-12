import Widget from "./Widget.js";
const $ = require("jquery");

class Text extends Widget {
  constructor(text) {
    super();
    this.elem = $("<p></p>").text(text);
  }
}

export default Text;
