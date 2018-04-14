import Widget from "./Widget";

const $ = require("jquery");

class VerticalList extends Widget {
  constructor(items) {
    super();
    this.elem = $("<div></div>");
    this.elem.addClass(
      "uk-card uk-card-default uk-card-hover uk-card-body uk-padding-small flex-row"
    );
    this.items = items;
  }

  render(where) {
    super.render(where);

    this.items.forEach(item => {
      let wrapper = $("<div></div>");
      item.render(wrapper);
      wrapper.appendTo(this.elem);
    });
  }
}

export default VerticalList;
