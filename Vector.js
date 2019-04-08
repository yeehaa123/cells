import random from "canvas-sketch-util/random";

class Spiral {
  constructor({ top, left, right, bottom, ...rest }) {
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
    this.cellWidth = right - left;
    this.cellHeight = bottom - top;
    Object.assign(this, rest);
  }

  update(options) {
    Object.assign(this, options);
    return this;
  }

  draw({ context }) {
    const { cellWidth, cellHeight } = this;
    context.lineWidth = 0;
    context.fillStyle = this.alive ? "black" : "white";
    context.fillRect(this.left, this.top, cellWidth, cellHeight);
  }
}

export default Spiral;
