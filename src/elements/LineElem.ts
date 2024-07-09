import PointElem from "./PointElem"
import {createSVGTagElem} from "../helper"
import { ElemType } from "../enum/ElemType"
import CurveElem from "./CurveElem"

export default class LineElem extends CurveElem {
    private d: string
    private startPoint: PointElem
    private endPoint: PointElem
    private isShow: boolean

    public constructor(startPoint: PointElem, endPoint: PointElem, label: Nullable<string>) {
        const d = `M ${startPoint.getX()} ${startPoint.getY()} L ${endPoint.getX()} ${endPoint.getY()}`

        const lineElem = createSVGTagElem("path")
        lineElem.setAttribute("d", d)

        super(lineElem, "red", startPoint.getX(), startPoint.getY(), label, false, ElemType.Curve)

        this.d = d
        this.startPoint = startPoint
        this.endPoint = endPoint
        this.isShow = true

        this.startPoint.onMove((_p) => {
            this.d = this.generateD()
            this.elem.setAttribute("d", this.d)
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

    private generateD(): string {
        const startPointX = this.startPoint.getX()
        const startPointY = this.startPoint.getY()
        const endPointX = this.endPoint.getX()
        const endPointY = this.endPoint.getY()

        return `M ${startPointX} ${startPointY} L ${endPointX} ${endPointY}`
    }

    public hide() {
        if (this.isShow) {
            this.elem.setAttribute("stroke-opacity", "0")
            this.isShow = false
            this.hideLabel()
        }
    }

    public show() {
        if (!this.isShow) {
            this.elem.setAttribute("stroke-opacity", "1")
            this.isShow = true
            this.showLabel()
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
        this.d = this.generateD()
        this.elem.setAttribute("d", this.d)
        this.endPoint.onMove((_p) => {
            this.d = this.generateD()
            this.elem.setAttribute("d", this.d)
        })
    }

    public remove() {
        this.elem.remove()
    }

    public onmousedown(_e: MouseEvent) {

    }

    public onmousemove(_e: MouseEvent) {

    }
}