import { BaseFigure } from './base-figure';
import { ICircle, FigureId } from '../core/interfaces';
import { GeometryError } from '../core/errors';

/**
 * Представляет геометрическую фигуру "Круг".
 *
 * @example
 * ```typescript
 * const circle = new Circle(5);
 * const diameter = circle.getDiameter();
 * console.log(diameter); // 10
 * ```
 *
 * @class Circle
 * @extends BaseFigure
 * @implements {ICircle}
 */
export class Circle extends BaseFigure implements ICircle {
    public readonly type = 'circle' as const;
    private _radius: number;

    /**
     * @param radius - Радиус круга (положительное число)
     * @param id - Опциональный уникальный идентификатор
     * @throws {GeometryError} Если радиус <= 0
     */
    constructor(radius: number, id?: FigureId) {
        super(id);
        if (radius <= 0) {
            throw new GeometryError('Radius must be a positive number.');
        }
        this._radius = radius;
    }

    /** Радиус круга */
    get radius(): number {
        return this._radius;
    }

    /** Установка радиуса. Генерирует событие {@link FigurePropertyChangeEvent} */
    set radius(value: number) {
        if (value <= 0) {
            throw new GeometryError('Radius must be a positive number.');
        }
        const oldValue = this._radius;
        this._radius = value;
        this._dispatchPropertyChange('radius', oldValue, value);
    }

    /**
     * Вычисляет площадь круга.
     * @returns Promise с площадью (π * r²)
     */
    async getArea(): Promise<number> {
        return Promise.resolve(Math.PI * this._radius ** 2);
    }

    /**
     * Вычисляет диаметр круга.
     * @returns Диаметр (2 * r)
     */
    getDiameter(): number {
        return 2 * this._radius;
    }

    /**
     * Вычисляет длину окружности.
     * @returns Длина окружности (2 * π * r)
     */
    getCircumference(): number {
        return 2 * Math.PI * this._radius;
    }
}