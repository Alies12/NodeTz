import { BaseFigure } from './base-figure';
import { IRectangle, FigureId } from '../core/interfaces';
import { GeometryError } from '../core/errors';

/**
 * Представляет геометрическую фигуру "Прямоугольник".
 *
 * @example
 * ```typescript
 * const rect = new Rectangle(10, 5);
 * const area = await rect.getArea();
 * console.log(area); // 50
 * ```
 *
 * @class Rectangle
 * @extends BaseFigure
 * @implements {IRectangle}
 */
export class Rectangle extends BaseFigure implements IRectangle {
    public readonly type = 'rectangle' as const;
    private _width: number;
    private _height: number;

    /**
     * @param width - Ширина прямоугольника (положительное число)
     * @param height - Высота прямоугольника (положительное число)
     * @param id - Опциональный уникальный идентификатор
     * @throws {GeometryError} Если ширина или высота <= 0
     */
    constructor(width: number, height: number, id?: FigureId) {
        super(id);
        if (width <= 0 || height <= 0) {
            throw new GeometryError('Width and height must be positive numbers.');
        }
        this._width = width;
        this._height = height;
    }

    /** Ширина прямоугольника */
    get width(): number {
        return this._width;
    }

    /** Установка ширины. Генерирует событие {@link FigurePropertyChangeEvent} */
    set width(value: number) {
        if (value <= 0) {
            throw new GeometryError('Width must be a positive number.');
        }
        const oldValue = this._width;
        this._width = value;
        this._dispatchPropertyChange('width', oldValue, value);
    }

    /** Высота прямоугольника */
    get height(): number {
        return this._height;
    }

    /** Установка высоты. Генерирует событие {@link FigurePropertyChangeEvent} */
    set height(value: number) {
        if (value <= 0) {
            throw new GeometryError('Height must be a positive number.');
        }
        const oldValue = this._height;
        this._height = value;
        this._dispatchPropertyChange('height', oldValue, value);
    }

    /**
     * Вычисляет площадь прямоугольника.
     * @returns Promise с площадью (width * height)
     */
    async getArea(): Promise<number> {
        return Promise.resolve(this._width * this._height);
    }

    /**
     * Вычисляет периметр прямоугольника.
     * @returns Периметр (2 * (width + height))
     */
    getPerimeter(): number {
        return 2 * (this._width + this._height);
    }
}