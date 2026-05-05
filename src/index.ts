export {
  IFigure,
  IRectangle,
  ITriangle,
  ICircle,
  AnyFigure,
  FigureParameters,
  FigureId,
  FigureType,
} from "./core/interfaces.js";
export { FigurePropertyChangeEvent } from "./core/events.js";
export { GeometryError } from "./core/errors.js";

export { Rectangle } from "./figures/rectangle.js";
export { Triangle } from "./figures/triangle.js";
export { Circle } from "./figures/circle.js";

export { BaseFigure } from "./figures/base-figure.js";
