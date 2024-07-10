import { ElemType } from "../enum/ElemType";
import { createSVGTagElem, pointDistance } from "../helper";
import CurveElem from "./CurveElem";
import PointElem from "./PointElem";

export default class CircleElem extends CurveElem {
    private center: PointElem
    private p: PointElem
    private isShow: boolean

    public constructor(center: PointElem, p: PointElem, label: Nullable<string>) {
        const elem = createSVGTagElem("circle")
        elem.setAttribute("cx", center.getX().toString())
        elem.setAttribute("cy", center.getY().toString())
        elem.setAttribute("r", pointDistance(center, p).toString())

        super(elem, "red", p.getX(), p.getY(), label, false, ElemType.Curve)

        this.center = center
        this.p = p
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
        this.removeLabel()
        this.elem.remove()
    }

    public onmousedown(_e: MouseEvent) {

    }

    public onmousemove(_e: MouseEvent) {

    }
}