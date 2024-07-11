import PointElem from "./PointElem"
import {createSVGTagElem} from "../helper"
import { ElemType } from "../enum/ElemType"
import CurveElem from "./CurveElem"
import LineEquation from "./LineEquation"

export default class LineElem extends CurveElem {
    private d: string
    private startPoint: PointElem
    private endPoint: PointElem
    protected equation: LineEquation

    public constructor(startPoint: PointElem, endPoint: PointElem, label: Nullable<string>) {
        const d = `M ${startPoint.getX()} ${startPoint.getY()} L ${endPoint.getX()} ${endPoint.getY()}`

        const lineElem = createSVGTagElem("path")
        lineElem.setAttribute("d", d)

        const equation = new LineEquation(startPoint.getX(), startPoint.getY(), endPoint.getX(), endPoint.getY())

        super(lineElem, equation, "red", startPoint.getX(), startPoint.getY(), label, false, ElemType.Curve)

        this.equation = equation

        this.d = d
        this.startPoint = startPoint
        this.endPoint = endPoint

        this.startPoint.onMove((_p) => {
            this.d = this.generateD()
            this.elem.setAttribute("d", this.d)

            this.updateEquation()
        })

        this.startPoint.onLeaveCallback(() => {
            this.remove()
        })

        this.endPoint.onMove((_p) => {
            this.d = this.generateD()
            this.elem.setAttribute("d", this.d)
        })

        this.endPoint.onLeaveCallback(() => {
            this.remove()
        })
    }

    public updateEquation() {
        this.equation.update(this.startPoint.getX(), this.startPoint.getY(), this.endPoint.getX(), this.endPoint.getY())
    }

    private generateD(): string {
        const startPointX = this.startPoint.getX()
        const startPointY = this.startPoint.getY()
        const endPointX = this.endPoint.getX()
        const endPointY = this.endPoint.getY()

        return `M ${startPointX} ${startPointY} L ${endPointX} ${endPointY}`
    }

    public getElem(): SVGElement {
        return this.elem
    }

    public getEndPoint(): PointElem {
        return this.endPoint
    }

    public setEndPoint(endPoint: PointElem) {
        this.endPoint = endPoint
        this.d = this.generateD()
        this.elem.setAttribute("d", this.d)
        this.endPoint.onMove((_p) => {
            this.d = this.generateD()
            this.elem.setAttribute("d", this.d)
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
        const m = this.equation.getM()
        const b = this.equation.getB()

        const m1 = 1/m
        const b1 = y - m1 * x

        const resultX = (b1 - b)/ (m - m1)
        const resultY = m * resultX + b

        return [resultX, resultY]
    }
}