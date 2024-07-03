import { createSVGTagElem, pointDistance } from "../helper";
import Elem from "./IElem";
import PointElem from "./PointElem";

export default class CircleElem implements Elem {
    private center: PointElem
    private p: PointElem
    private elem: SVGElement
    private stroke: string

    public constructor(center: PointElem, p: PointElem) {
        this.center = center
        this.p = p
        this.stroke = "red"

        const elem = createSVGTagElem("circle")
        elem.setAttribute("cx", this.center.getX().toString())
        elem.setAttribute("cy", this.center.getY().toString())
        elem.setAttribute("r", pointDistance(this.center, this.p).toString())
        elem.setAttribute("stroke", this.stroke)
        elem.setAttribute("fill-opacity", "0")

        this.center.onMove((p: PointElem) => {
            elem.setAttribute("cx", p.getX().toString())
            elem.setAttribute("cy", p.getY().toString())
            elem.setAttribute("r", pointDistance(p, this.p).toString())
        })

        this.p.onMove((p: PointElem) => {
            elem.setAttribute("r", pointDistance(this.center, p).toString())
        })

        this.elem = elem
    }

    public getElem(): SVGElement {
        return this.elem
    }

    public remove() {
        this.elem.remove()
    }
}