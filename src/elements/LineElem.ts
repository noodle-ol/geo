import PointElem from "./PointElem"
import {createSVGTagElem} from "../helper"
import { ElemType } from "../enum/ElemType"
import CurveElem from "./CurveElem"
import CurveEquation from "./CurveEquation"

const createEquation = (startPoint: PointElem, endPoint: PointElem): [(x: number, y: number) => number, (x: number, y: number) => number] => {
    let equation = null
    let distanceEquation = null
    if (startPoint.getX() == endPoint.getX()) {
        equation = (x: number, _y: number): number => {
            return x - startPoint.getX()
        }

        distanceEquation = (x: number, _y: number): number => {
            return Math.abs(x - startPoint.getX())
        }
    } else {
        equation = (x: number, y: number): number => {
            return y - endPoint.getY() - (startPoint.getY() - endPoint.getY()) * (x - endPoint.getX()) / (startPoint.getX() - endPoint.getX())
        }

        distanceEquation = (x: number, y: number): number => {
            return Math.abs(y - endPoint.getY() - (startPoint.getY() - endPoint.getY()) * (x - endPoint.getX()) / (startPoint.getX() - endPoint.getX())) / Math.sqrt(1 + (Math.pow(startPoint.getY() - endPoint.getY(), 2) / Math.pow(startPoint.getX() - endPoint.getX(), 2)))
        }
    }

    return [equation, distanceEquation]
}

export default class LineElem extends CurveElem {
    private d: string
    private startPoint: PointElem
    private endPoint: PointElem

    public constructor(startPoint: PointElem, endPoint: PointElem, label: Nullable<string>) {
        const d = `M ${startPoint.getX()} ${startPoint.getY()} L ${endPoint.getX()} ${endPoint.getY()}`

        const lineElem = createSVGTagElem("path")
        lineElem.setAttribute("d", d)

        const [equation, distanceEquation] = createEquation(startPoint, endPoint)

        super(lineElem, new CurveEquation(equation, distanceEquation), "red", startPoint.getX(), startPoint.getY(), label, false, ElemType.Curve)

        this.d = d
        this.startPoint = startPoint
        this.endPoint = endPoint

        this.startPoint.onMove((_p) => {
            this.d = this.generateD()
            this.elem.setAttribute("d", this.d)

            const [equation, distanceEquation] = this.updateEquation()
            this.equation.setEquation(equation)
            this.equation.setDistanceEquation(distanceEquation)
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

    private updateEquation(): [(x: number, y: number) => number, (x: number, y: number) => number] {
        return createEquation(this.startPoint, this.endPoint)
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

        const [equation, distanceEquation] = this.updateEquation()
        this.equation.setEquation(equation)
        this.equation.setDistanceEquation(distanceEquation)
    }

    public remove() {
        this.removeLabel()
        this.elem.remove()
    }

    public onmousedown(_e: MouseEvent) {

    }

    public onmousemove(_e: MouseEvent) {

    }
}