import { BaseFigure } from "./base-figure";
import { ITriangle, FigureId } from "../core/interfaces";
import { GeometryError } from "../core/errors";

/**
 * Представляет геометрическую фигуру "Треугольник", заданную тремя сторонами.
 * При создании и изменении сторон проверяется неравенство треугольника.
 *
 * @example
 * ```typescript
 * const tri = new Triangle(3, 4, 5);
 * const area = await tri.getArea();
 * console.log(area); // 6
 * ```
 *
 * @class Triangle
 * @extends BaseFigure
 * @implements {ITriangle}
 */
export class Triangle extends BaseFigure implements ITriangle {
  public readonly type = "triangle" as const;
  private _sideA: number;
  private _sideB: number;
  private _sideC: number;

  /**
   * @param a - Сторона A (положительное число)
   * @param b - Сторона B (положительное число)
   * @param c - Сторона C (положительное число)
   * @param id - Опциональный уникальный идентификатор
   * @throws {GeometryError} Если стороны не удовлетворяют неравенству треугольника
   */
  constructor(a: number, b: number, c: number, id?: FigureId) {
    super(id);
    if (a <= 0 || b <= 0 || c <= 0) {
      throw new GeometryError("Sides must be positive numbers.");
    }
    if (a + b <= c || a + c <= b || b + c <= a) {
      throw new GeometryError(
        "The given sides do not satisfy the triangle inequality.",
      );
    }
    this._sideA = a;
    this._sideB = b;
    this._sideC = c;
  }

  get sideA(): number {
    return this._sideA;
  }
  set sideA(value: number) {
    this._validateAndSet("_sideA", value);
  }

  get sideB(): number {
    return this._sideB;
  }
  set sideB(value: number) {
    this._validateAndSet("_sideB", value);
  }

  get sideC(): number {
    return this._sideC;
  }
  set sideC(value: number) {
    this._validateAndSet("_sideC", value);
  }

  /**
   * Проверяет неравенство треугольника перед установкой нового значения стороны.
   * @param sideKey - Ключ изменяемой стороны
   * @param newValue - Новое значение
   * @throws {GeometryError} Если неравенство треугольника нарушается
   * @private
   */
  private _validateAndSet(
    sideKey: "_sideA" | "_sideB" | "_sideC",
    newValue: number,
  ): void {
    if (newValue <= 0) {
      throw new GeometryError("Side must be a positive number.");
    }

    const sides = { a: this._sideA, b: this._sideB, c: this._sideC };
    if (sideKey === "_sideA") sides.a = newValue;
    if (sideKey === "_sideB") sides.b = newValue;
    if (sideKey === "_sideC") sides.c = newValue;

    if (
      sides.a + sides.b <= sides.c ||
      sides.a + sides.c <= sides.b ||
      sides.b + sides.c <= sides.a
    ) {
      throw new GeometryError(
        "Changing this side violates the triangle inequality.",
      );
    }

    const oldValue = this[sideKey];
    this[sideKey] = newValue;
    this._dispatchPropertyChange(sideKey, oldValue, newValue);
  }

  /**
   * Вычисляет площадь треугольника по формуле Герона.
   * @returns Promise с площадью треугольника
   */
  async getArea(): Promise<number> {
    const s = this.getPerimeter() / 2;
    const area = Math.sqrt(
      s * (s - this._sideA) * (s - this._sideB) * (s - this._sideC),
    );
    return Promise.resolve(area);
  }

  /**
   * Вычисляет периметр треугольника.
   * @returns Периметр (sideA + sideB + sideC)
   */
  getPerimeter(): number {
    return this._sideA + this._sideB + this._sideC;
  }
}
