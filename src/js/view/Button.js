import Widget from "./Widget.js";
const $ = require("jquery");

class Button extends Widget {
  constructor(text) {
    super();
    this.elem = $("<button></button>").text(text);
    this.addClass("uk-button uk-button-default uk-button-small");
    this.elem.click(this.onClick.bind(this));
  }

  onClick(evt) {
    console.log("Click on me");
  }
}

export default Button;
