import random from "canvas-sketch-util/random";
import { lerp } from "canvas-sketch-util/math";
import Cell from "./Cell";

const calcCoords = ({ u, v, margin, count, cellWidth }) => {
  const mod = cellWidth / 2;
  const top = v - mod;
  const bottom = top + cellWidth;
  const left = u - mod;
  const right = left + cellWidth;
  const center = {
    u,
    v
  };
  return { top, bottom, left, right, center };
};

class Grid {
  constructor({ width, height, margin, count, probability = 1 }) {
    this.count = count;
    this.margin = margin;
    this.probability = probability;
    this.cellWidth = (1 - margin * 2) / count;
    this.cells = this.populate();
  }

  populate() {
    const cells = [];
    for (let x = 0; x < this.count; x++) {
      for (let y = 0; y < this.count; y++) {
        const coords = calcCoords({
          u: lerp(this.margin, 1 - this.margin, x / (this.count - 1)),
          v: lerp(this.margin, 1 - this.margin, y / (this.count - 1)),
          margin: this.margin,
          count: this.count,
          cellWidth: this.cellWidth
        });
        const cell = new Cell({
          isAlive: random.chance(this.probability),
          ...coords
        });
        cells.push(cell);
      }
    }
    return cells;
  }

  update(Constructor, options) {
    this.cells = this.cells.map(cell => {
      return cell.constructor.name === Constructor.name
        ? cell.update(options)
        : new Constructor({ ...cell, ...options });
    });
  }

  draw({ context, playhead, width, height }) {
    this.cells.forEach(cell => {
      return (
        cell.isAlive &&
        cell.draw({
          width,
          height,
          context,
          playhead
        })
      );
    });
  }
}

export default Grid;
