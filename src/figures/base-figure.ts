import {
  IFigure,
  FigureId,
  FigureType,
  FigureParameters,
} from "../core/interfaces";
import { FigurePropertyChangeEvent } from "../core/events";

let lastGeneratedId = 0;
function generateUniqueId(): FigureId {
  return `figure_${Date.now()}_${++lastGeneratedId}`;
}

/**
 * Абстрактный базовый класс для всех геометрических фигур.
 * Предоставляет общую функциональность: генерацию ID, работу с событиями.
 * Наследует {@link EventTarget} для поддержки событийной модели.
 *
 * Для создания новой фигуры необходимо:
 * 1. Унаследовать класс от BaseFigure
 * 2. Реализовать метод {@link getArea}
 * 3. Определить свойство type
 *
 * @abstract
 * @implements {IFigure}
 */
export abstract class BaseFigure extends EventTarget implements IFigure {
  /** Уникальный идентификатор фигуры */
  public readonly id: FigureId;
  /** Тип фигуры */
  public abstract readonly type: FigureType;

  /**
   * @param id - Опциональный идентификатор. Если не указан, генерируется автоматически.
   */
  constructor(id?: FigureId) {
    super();
    this.id = id || generateUniqueId();
  }

  /**
   * Возвращает базовые параметры фигуры: id и type.
   * @returns Объект с идентификатором и типом фигуры
   */
  getParameters(): FigureParameters {
    return {
      id: this.id,
      type: this.type,
    };
  }

  /**
   * Вычисляет площадь фигуры.
   * @returns Promise с числовым значением площади
   * @abstract
   */
  abstract getArea(): Promise<number>;

  /**
   * Вспомогательный метод для генерации события изменения свойства.
   * @param property - Имя изменённого свойства
   * @param oldValue - Старое значение
   * @param newValue - Новое значение
   * @protected
   */
  protected _dispatchPropertyChange(
    property: string,
    oldValue: any,
    newValue: any,
  ): void {
    if (oldValue !== newValue) {
      this.dispatchEvent(
        new FigurePropertyChangeEvent(property, oldValue, newValue),
      );
    }
  }
}
