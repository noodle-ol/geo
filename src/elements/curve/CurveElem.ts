import { ElemType } from "../../enum/ElemType";
import CurveElems from "./CurveElems";
import CurveEquation from "./CurveEquation";
import CurveStyle from "./CurveStyle";
import LabelElem from "../label/LabelElem";

export default class CurveElem extends LabelElem {
    protected stroke: string
    protected strokeWidth: number
    protected equation: CurveEquation
    protected isShow: boolean
    protected onMoveCallbacks: ((p: CurveElem) => void)[]

    public constructor(elem: SVGElement, equation: CurveEquation, stroke: string, parentX: number, parentY: number, label: Nullable<string>, isLabelShow: boolean, elemType: ElemType) {
        super(elem, parentX, parentY, label, isLabelShow, elemType)

        this.isShow = true
        this.equation = equation
        this.stroke = stroke
        this.strokeWidth = 1
        this.elem.setAttribute("stroke", this.stroke)
        this.elem.setAttribute("stroke-width", this.strokeWidth.toString())
        this.elem.setAttribute("fill", "transparent")
        this.elem.classList.add("cursor-pointer")
        this.onMoveCallbacks = []

        CurveElems.instance.push(this)
    }

    public setStroke(stroke: string) {
        this.stroke = stroke
        this.elem.setAttribute("stroke", this.stroke)
    }

    public setStyle(style: CurveStyle) {
        if (style.stroke != undefined) {
            this.setStroke(style.stroke)
        }
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

    public getIsShow() {
        return this.isShow
    }

    public isClick(x: number, y: number) {
        return this.equation.distance(x, y) <= 9
    }

    public choose() {
        this.elem.setAttribute("stroke-width", (this.strokeWidth * 2).toString())
    }

    public unchoose() {
        this.elem.setAttribute("stroke-width", this.strokeWidth.toString())
    }

    public getFoot(x: number, y: number): [number, number] {
        return [x, y]
    }

    public updateEquation(){}

    public onMove(callback: (p: CurveElem) => void) {
        this.onMoveCallbacks.push(callback)
    }
}