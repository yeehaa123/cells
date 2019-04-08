class Cell {
  constructor({ isAlive, top, bottom, left, right, center, ...rest }) {
    this.isAlive = isAlive;
    this.center = center;
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
    this.cellWidth = this.right - this.left;
    this.cellHeight = this.bottom - this.top;
    this.update(rest);
  }

  update({ ...rest }) {
    const options = {};

    Object.keys(rest).forEach(key => {
      const val = rest[key];
      if (typeof val === "function") {
        options[key] = val();
      } else {
        options[key] = val;
      }
    });

    return Object.assign(this, options);
  }
}

export default Cell;
