// src/core/interfaces.ts

export type FigureId = string;

export type FigureType = 'rectangle' | 'triangle' | 'circle';

export interface FigureParameters {
    id: FigureId;
    type: FigureType;
}

export interface IFigure extends EventTarget {
    readonly id: FigureId;
    readonly type: FigureType;

    getParameters(): FigureParameters;
    getArea(): Promise<number>;
}

export interface IRectangle extends IFigure {
    readonly type: 'rectangle';
    readonly width: number;
    readonly height: number;

    getPerimeter(): number;
}

export interface ITriangle extends IFigure {
    readonly type: 'triangle';
    readonly sideA: number;
    readonly sideB: number;
    readonly sideC: number;

    getPerimeter(): number;
}

export interface ICircle extends IFigure {
    readonly type: 'circle';
    readonly radius: number;

    getDiameter(): number;
    getCircumference(): number;
}

export type AnyFigure = IRectangle | ITriangle | ICircle;