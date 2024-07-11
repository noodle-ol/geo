import { ElemType } from "../enum/ElemType";
import { createSVGTagElem, distance, pointDistance } from "../helper";
import CircleEquation from "./CircleEquation";
import CurveElem from "./CurveElem";
import PointElem from "./PointElem";

export default class CircleElem extends CurveElem {
    private center: PointElem
    private p: PointElem
    protected equation: CircleEquation

    public constructor(center: PointElem, p: PointElem, label: Nullable<string>) {
        const elem = createSVGTagElem("circle")
        elem.setAttribute("cx", center.getX().toString())
        elem.setAttribute("cy", center.getY().toString())
        elem.setAttribute("r", pointDistance(center, p).toString())

        const equation = new CircleEquation(center.getX(), center.getY(), p.getX(), p.getY())

        super(elem, equation, "red", p.getX(), p.getY(), label, false, ElemType.Curve)

        this.equation = equation
        this.center = center
        this.p = p

        this.center.onMove((p: PointElem) => {
            elem.setAttribute("cx", p.getX().toString())
            elem.setAttribute("cy", p.getY().toString())
            elem.setAttribute("r", pointDistance(p, this.p).toString())

            this.updateEquation()
        })

        this.center.onLeaveCallback(() => {
            this.remove()
        })

        this.p.onMove((p: PointElem) => {
            this.elem.setAttribute("r", pointDistance(this.center, p).toString())
        })

        this.p.onLeaveCallback(() => {
            this.remove()
        })

        this.elem = elem
    }

    public updateEquation() {
        this.equation.update(this.center.getX(), this.center.getY(), this.p.getX(), this.p.getY())
    }

    public getElem(): SVGElement {
        return this.elem
    }

    public getP(): PointElem {
        return this.p
    }

    public setP(p: PointElem) {
        this.p = p
        this.elem.setAttribute("r", pointDistance(this.center, p).toString())
        this.p.onMove((p: PointElem) => {
            this.elem.setAttribute("r", pointDistance(this.center, p).toString())
        })

        this.updateEquation()
    }

    public remove() {
        this.removeLabel()
        this.elem.remove()
    }

    public onmousedown(_e: MouseEvent) {}

    public onmousemove(_e: MouseEvent) {}

    public getFoot(x: number, y: number): [number, number] {
        const k = this.equation.getK()
        const h = this.equation.getH()
        const r = this.equation.getR()

        const x1 = this.center.getX()
        const y1 = this.center.getY()
        const m = (y1 - y) / (x1 - x)
        const b = y - (y1 - y) * x / (x1 - x)

        const betta = 2*m*b - 2*k*m - 2*h
        const alpha = m*m + 1
        const delta = Math.pow(betta, 2) - 4*alpha*(b*b - 2*k*b + k*k + h*h - r)

        const resultX1 = (-betta + Math.sqrt(delta))/(2 * alpha)
        const resultX2 = (-betta - Math.sqrt(delta))/(2 * alpha)

        const resultY1 = m * resultX1 + b
        const resultY2 = m * resultX2 + b

        const distanceX1 = distance(resultX1, resultY1, x, y)
        const distanceX2 = distance(resultX2, resultY2, x, y)

        if (distanceX1 < distanceX2) {
            return [resultX1, resultY1]
        }

        return [resultX2, resultY2]
    }
}