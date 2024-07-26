import PointElem from "../point/PointElem"
import {createSVGTagElem} from "../../helpers/helper"
import { ElemType } from "../../enum/ElemType"
import CurveElem from "../curve/CurveElem"
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
            this.move()
        })

        this.startPoint.onLeaveCallback(() => {
            this.remove()
        })

        this.endPoint.onMove((_p) => {
            this.move()
        })

        this.endPoint.onLeaveCallback(() => {
            this.remove()
        })
    }

    public updateEquation() {
        this.equation.update(this.startPoint.getX(), this.startPoint.getY(), this.endPoint.getX(), this.endPoint.getY())
    }

    public move() {
        const startPointX = this.startPoint.getX()
        const startPointY = this.startPoint.getY()
        const endPointX = this.endPoint.getX()
        const endPointY = this.endPoint.getY()

        this.d = `M ${startPointX} ${startPointY} L ${endPointX} ${endPointY}`
        this.elem.setAttribute("d", this.d)
        this.updateEquation()

        for (const callback of this.onMoveCallbacks) {
            callback(this)
        }
    }

    public getElem(): SVGElement {
        return this.elem
    }

    public getEndPoint(): PointElem {
        return this.endPoint
    }

    public setEndPoint(endPoint: PointElem) {
        this.endPoint = endPoint
        this.move()
        this.endPoint.onMove((_p) => {
            this.move()
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

    public getRatio(x: number, _y: number): number {
        if (this.endPoint.getX() == this.startPoint.getX()) {
            return 0
        }

        return (x - this.startPoint.getX()) / (this.endPoint.getX() - this.startPoint.getX())
    }

    public getPointByRatio(ratio: number): [number, number] {
        return [(this.endPoint.getX() - this.startPoint.getX()) * ratio + this.startPoint.getX(), (this.endPoint.getY() - this.startPoint.getY()) * ratio + this.startPoint.getY()]
    }
}