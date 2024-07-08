import PointElem from "./PointElem"
import {createSVGTagElem} from "../helper"
import LabelElem from "./LabelElem"

export default class LineElem extends LabelElem {
    private d: string
    private startPoint: PointElem
    private endPoint: PointElem

    public constructor(startPoint: PointElem, endPoint: PointElem, label: Nullable<string>) {
        const d = `M ${startPoint.getX()} ${startPoint.getY()} L ${endPoint.getX()} ${endPoint.getY()}`

        const lineElem = createSVGTagElem("path")
        lineElem.setAttribute("d", d)
        lineElem.setAttribute("stroke", "red")

        super(lineElem, startPoint.getX(), startPoint.getY(), label, false)

        this.d = d
        this.startPoint = startPoint
        this.endPoint = endPoint

        this.startPoint.onMove((_p) => {
            this.d = this.generateD()
            this.elem.setAttribute("d", this.d)
        })

        this.endPoint.onMove((_p) => {
            this.d = this.generateD()
            this.elem.setAttribute("d", this.d)
        })
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
    }

    public remove() {
        this.elem.remove()
    }

    public onmousedown(_e: MouseEvent) {

    }

    public onmousemove(_e: MouseEvent) {

    }
}