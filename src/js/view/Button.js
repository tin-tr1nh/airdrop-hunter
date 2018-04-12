import Widget from "./Widget.js";
const $ = require("jquery");

class Button extends Widget {
  constructor(text) {
    super();
    this.elem = $("<button></button>").text(text);
    this.elem.click(this.onClick.bind(this));
  }

  onClick(evt) {
    console.log("Click on me");
  }
}

export default Button;
