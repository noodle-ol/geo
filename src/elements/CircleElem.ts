import { createSVGTagElem, pointDistance } from "../helper";
import LabelElem from "./LabelElem";
import PointElem from "./PointElem";

export default class CircleElem extends LabelElem {
    private center: PointElem
    private p: PointElem
    private stroke: string
    private isShow: boolean

    public constructor(center: PointElem, p: PointElem, label: Nullable<string>) {
        const stroke = "red"

        const elem = createSVGTagElem("circle")
        elem.setAttribute("cx", center.getX().toString())
        elem.setAttribute("cy", center.getY().toString())
        elem.setAttribute("r", pointDistance(center, p).toString())
        elem.setAttribute("stroke", stroke)
        elem.setAttribute("fill-opacity", "0")

        super(elem, p.getX(), p.getY(), label, false)

        this.center = center
        this.p = p
        this.stroke = stroke
        this.isShow = true

        this.center.onMove((p: PointElem) => {
            elem.setAttribute("cx", p.getX().toString())
            elem.setAttribute("cy", p.getY().toString())
            elem.setAttribute("r", pointDistance(p, this.p).toString())
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

    public getElem(): SVGElement {
        return this.elem
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

    public getStroke(): string {
        return this.stroke
    }

    public setStroke(stroke: string) {
        this.stroke = stroke
        this.elem.setAttribute("stroke", this.stroke)
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
    }

    public remove() {
        this.elem.remove()
    }

    public onmousedown(_e: MouseEvent) {

    }

    public onmousemove(_e: MouseEvent) {

    }
}