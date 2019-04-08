import random from "canvas-sketch-util/random";
import Cell from "./Cell";

const calcCoords = ({ x, y, margin, cellWidth }) => {
  const top = margin + y * cellWidth;
  const bottom = top + cellWidth;
  const left = margin + x * cellWidth;
  const right = left + cellWidth;
  const center = {
    x: (left + right) / 2,
    y: (top + bottom) / 2
  };
  return { top, bottom, left, right, center };
};

class Grid {
  constructor({ width, height, margin, count, probability = 1 }) {
    this.count = count;
    this.width = width;
    this.height = height;
    this.margin = margin;
    this.probability = probability;
    this.cellWidth = (width - margin * 2) / count;
    this.cells = this.populate();
  }

  populate() {
    const cells = [];
    for (let x = 0; x < this.count; x++) {
      for (let y = 0; y < this.count; y++) {
        const coords = calcCoords({
          x,
          y,
          margin: this.margin,
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

  draw({ context, playhead }) {
    this.cells.forEach(cell => {
      return (
        cell.isAlive &&
        cell.draw({
          context,
          playhead
        })
      );
    });
  }
}

export default Grid;
