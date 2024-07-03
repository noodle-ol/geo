import PointElem from "./PointElem"
import {createSVGTagElem} from "../helper"
import Elem from "./IElem"

export default class LineElem implements Elem {
    private d: string
    private startPoint: PointElem
    private endPoint: PointElem
    private elem: SVGElement

    public constructor(startPoint: PointElem, endPoint: PointElem) {
        this.startPoint = startPoint
        this.endPoint = endPoint

        this.d = this.generateD()

        const lineElem = createSVGTagElem("path")
        lineElem.setAttribute("d", this.d)
        lineElem.setAttribute("stroke", "red")

        this.elem = lineElem
        
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

    public remove() {
        this.elem.remove()
    }
}