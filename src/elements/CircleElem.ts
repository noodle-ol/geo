import { ElemType } from "../enum/ElemType";
import { createSVGTagElem, pointDistance } from "../helper";
import CurveElem from "./CurveElem";
import CurveEquation from "./CurveEquation";
import PointElem from "./PointElem";

export default class CircleElem extends CurveElem {
    private center: PointElem
    private p: PointElem

    public constructor(center: PointElem, p: PointElem, label: Nullable<string>) {
        const elem = createSVGTagElem("circle")
        elem.setAttribute("cx", center.getX().toString())
        elem.setAttribute("cy", center.getY().toString())
        elem.setAttribute("r", pointDistance(center, p).toString())

        const equation = (x: number, y: number): number => {
            return Math.pow(x - center.getX(), 2) + Math.pow(y - center.getY(), 2) - Math.pow(p.getX() - center.getX(), 2) - Math.pow(p.getY() - center.getY(), 2)
        }

        const distanceEquation = (x: number, y: number): number => {
            return Math.abs(Math.sqrt(Math.pow(x - center.getX(), 2) + Math.pow(y - center.getY(), 2)) - Math.sqrt(Math.pow(p.getX() - center.getX(), 2) - Math.pow(p.getY() - center.getY(), 2)))
        }

        super(elem, new CurveEquation(equation, distanceEquation), "red", p.getX(), p.getY(), label, false, ElemType.Curve)

        this.center = center
        this.p = p

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

    public getP(): PointElem {
        return this.p
    }

    public setP(p: PointElem) {
        this.p = p
        this.elem.setAttribute("r", pointDistance(this.center, p).toString())
        this.p.onMove((p: PointElem) => {
            this.elem.setAttribute("r", pointDistance(this.center, p).toString())
        })

        const equation = (x: number, y: number): number => {
            return Math.pow(x - this.center.getX(), 2) + Math.pow(y - this.center.getY(), 2) - Math.pow(this.p.getX() - this.center.getX(), 2) - Math.pow(this.p.getY() - this.center.getY(), 2)
        }

        const distanceEquation = (x: number, y: number): number => {
            return Math.abs(Math.sqrt(Math.pow(x - this.center.getX(), 2) + Math.pow(y - this.center.getY(), 2)) - Math.sqrt(Math.pow(this.p.getX() - this.center.getX(), 2) - Math.pow(this.p.getY() - this.center.getY(), 2)))
        }

        this.setEquation(new CurveEquation(equation, distanceEquation))
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