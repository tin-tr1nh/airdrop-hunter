class Widget {
  constructor() {
    this.elem = null;
    this.attrClasses = [];
  }

  addClass(cls) {
    this.attrClasses.push(cls);
  }

  render(where) {
    if (this.elem) {
      this.attrClasses.forEach(attrCls => {
        this.elem.addClass(attrCls);
      });
      this.elem.appendTo(where);
    }
  }
}

export default Widget;
