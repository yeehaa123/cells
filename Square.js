import random from "canvas-sketch-util/random";
import Cell from "./Cell";

class Square extends Cell {
  update({ ...params }) {
    super.update({ ...params });
    this.size = this.cellWidth;
    this.left = random.gaussian(this.left, this.multiplier);
    this.top = random.gaussian(this.top, this.multiplier);
    return this;
  }

  draw({ context, width, height }) {
    const left = this.left * width;
    const top = this.top * height;
    const size = this.size * width;

    context.fillStyle = this.color;
    context.fillRect(left, top, size, size);
  }
}

export default Square;
