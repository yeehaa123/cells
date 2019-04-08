import random from "canvas-sketch-util/random";
import Cell from "./Cell";

class Square extends Cell {
  update({ ...params }) {
    super.update({ ...params });
    this.left = this.left + random.range(-this.multiplier, this.multiplier);
    this.top = this.top + random.range(-this.multiplier, this.multiplier);
    return this;
  }

  draw({ context }) {
    const { cellWidth, cellHeight } = this;
    context.fillStyle = this.color;
    context.fillRect(this.left, this.top, cellWidth, cellHeight);
  }
}

export default Square;
