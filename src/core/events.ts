/**
 * Событие, которое вызывается при изменении свойств фигуры.
 * Наследует {@link CustomEvent} и содержит информацию об изменённом свойстве.
 *
 * @example
 * ```typescript
 * rect.addEventListener(FigurePropertyChangeEvent.EVENT_NAME, (event) => {
 *     const detail = (event as FigurePropertyChangeEvent).detail;
 *     console.log(`Свойство ${detail.property} изменено`);
 * });
 * ```
 */
export class FigurePropertyChangeEvent extends CustomEvent<{ property: string; oldValue: any; newValue: any }> {
    /** Имя события для использования в addEventListener */
    static readonly EVENT_NAME = 'propertychange';

    /**
     * @param property - Имя изменённого свойства
     * @param oldValue - Старое значение
     * @param newValue - Новое значение
     */
    constructor(property: string, oldValue: any, newValue: any) {
        super(FigurePropertyChangeEvent.EVENT_NAME, {
            detail: { property, oldValue, newValue },
            bubbles: true,
            composed: true,
        });
    }
}