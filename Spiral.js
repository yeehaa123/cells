import random from "canvas-sketch-util/random";
import Cell from "./Cell";

class Spiral extends Cell {
  constructor(params) {
    super(params);
    this.circum = Math.PI * 2 * this.multiplier;
    this.maxRadius = (this.cellWidth / this.circum) * 1.5;
  }

  calcVars({ i, playhead, width }) {
    const regularRadius = Math.abs(this.maxRadius * i);
    const regularModifier = playhead ? i * playhead : i + 0.1;

    const randomModifier = i + Math.abs(random.noise2D(i, playhead));
    const randomRadius = Math.abs(
      random.noise2D(playhead, randomModifier, 1, this.maxRadius * i)
    );

    const radius = this.isRegular ? regularRadius : randomRadius;
    const modifier = this.isRegular ? regularModifier : randomModifier;
    return { radius: radius * width, modifier };
  }

  draw({ context, width, height, playhead }) {
    context.lineWidth = 1;
    context.strokeStyle = this.color || "white";

    context.beginPath();
    for (let i = 0; i <= this.circum; i = i + random.range(0.1)) {
      const { radius, modifier } = this.calcVars({ i, playhead, width });
      const x = this.center.u * width;
      const y = this.center.v * height;
      context.arc(x, y, radius, i, modifier, this.isClockwise);
    }
    context.stroke();
  }
}

export default Spiral;
