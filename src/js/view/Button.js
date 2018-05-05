import Widget from "./Widget.js";
const $ = require("jquery");

class Button extends Widget {
  constructor(text) {
    super();
    this.elem = $("<button></button>").text(text);
    this.addClass("uk-button uk-button-default uk-button-small");
  }

  addClickListener(func) {
    this.elem.click(func);
  }
}

export default Button;