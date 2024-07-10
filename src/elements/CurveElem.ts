import { ElemType } from "../enum/ElemType";
import CurveStyle from "./CurveStyle";
import LabelElem from "./LabelElem";

export default class CurveElem extends LabelElem {
    private stroke: string

    public constructor(elem: SVGElement, stroke: string, parentX: number, parentY: number, label: Nullable<string>, isLabelShow: boolean, elemType: ElemType) {
        super(elem, parentX, parentY, label, isLabelShow, elemType)

        this.stroke = stroke
        this.elem.setAttribute("stroke", this.stroke)
        this.elem.setAttribute("fill", "transparent")
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
}