import { createLineDistanceEquation, createLineEquation } from "../equationHelper"
import CurveEquation from "./CurveEquation"

// y = mx + b
export default class LineEquation extends CurveEquation {
    private m: number
    private b: number

    public constructor(x1: number, y1: number, x2: number, y2: number) {
        const equation = createLineEquation(x1, y1, x2, y2)
        const distanceEquation = createLineDistanceEquation(x1, y1, x2, y2)

        super(equation, distanceEquation)

        this.m = (y1 - y2) / (x1 - x2)
        this.b = y2 - (y1 - y2) * x2 / (x1 - x2)
    }

    public getM(): number {
        return this.m
    }

    public getB(): number {
        return this.b
    }

    public update(x1: number, y1: number, x2: number, y2: number) {
        this.setEquation(createLineEquation(x1, y1, x2, y2))
        this.setDistanceEquation(createLineDistanceEquation(x1, y1, x2, y2))
        this.m = (y1 - y2) / (x1 - x2)
        this.b = y2 - (y1 - y2) * x2 / (x1 - x2)
    }
}