/**
 * Ошибка, выбрасываемая при нарушении геометрических ограничений.
 * Например, отрицательный радиус, нарушение неравенства треугольника и т.д.
 *
 * @extends Error
 */
export class GeometryError extends Error {
    /**
     * @param message - Описание ошибки
     */
    constructor(message: string) {
        super(message);
        this.name = 'GeometryError';
    }
}