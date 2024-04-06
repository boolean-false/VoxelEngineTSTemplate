export interface IVector3 {
    x: number;
    y: number;
    z: number;
}

export default class Vector3 implements IVector3 {
    constructor(
        public x: number,
        public y: number,
        public z: number
    ) {}

    toString = (): string => `X:${this.x} Y:${this.y} Z:${this.z}`
}
