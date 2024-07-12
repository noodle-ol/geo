import { createCircleDistanceEquation, createCircleEquation } from "../../helpers/equationHelper"
import CurveEquation from "../curve/CurveEquation"

// (y - k)^2 + (x - h)^2 = r
export default class CircleEquation extends CurveEquation {
    private k: number
    private h: number
    private r: number

    public constructor(x1: number, y1: number, x2: number, y2: number) {
        const equation = createCircleEquation(x1, y1, x2, y2)
        const distanceEquation = createCircleDistanceEquation(x1, y1, x2, y2)

        super(equation, distanceEquation)

        this.h = x1
        this.k = y1
        this.r = Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
    }

    public getH(): number {
        return this.h
    }

    public getK(): number {
        return this.k
    }

    public getR(): number {
        return this.r
    }

    public update(x1: number, y1: number, x2: number, y2: number) {
        this.setEquation(createCircleEquation(x1, y1, x2, y2))
        this.setDistanceEquation(createCircleDistanceEquation(x1, y1, x2, y2))
        this.h = x1
        this.k = y1
        this.r = Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
    }
}