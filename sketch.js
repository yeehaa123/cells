import canvasSketch from "canvas-sketch";
import random from "canvas-sketch-util/random";
import Spiral from "./Spiral";
import Square from "./Square";
import Grid from "./Grid";
import palettes from "nice-color-palettes";

const palette = random.pick(palettes);
const background = palette.shift();

const options = {
  color: () => random.pick(palette),
  multiplier: random.range(0, 10),
  isRegular: () => random.chance(0.5),
  isClockwise: () => random.chance(0.4)
};

const Constructor = Square;

const settings = {
  animate: true,
  duration: 3,
  fps: 24,
  dimensions: [2048, 2048]
};

const sketch = ({ width, height }) => {
  const count = 15;
  const margin = width / 8;
  const probability = 0.35;

  const grid = new Grid({
    width,
    height,
    margin,
    count,
    palette,
    probability
  });

  grid.update(Constructor, options);

  return ({ context, playhead }) => {
    context.lineWidth = random.range(1);
    context.fillStyle = background;
    context.fillRect(0, 0, grid.width, grid.height);
    grid.update(Constructor, {});

    grid.draw({
      context,
      playhead
    });
  };
};

canvasSketch(sketch, settings);
