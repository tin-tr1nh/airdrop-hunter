import Widget from "./Widget";

const $ = require("jquery");

class VerticalList extends Widget {
  constructor(items) {
    super();
    this.elem = $("<div></div>");
    this.items = items;
  }

  addItem(item) {
    this.items.push(item);
  }

  render(where) {
    super.render(where);

    this.items.forEach(item => {
      item.render(this.elem);
    });
  }

  empty() {
    super.empty();
    this.items = [];
  }
}

export default VerticalList;