import { ElemType } from "../enum/ElemType";
import { createSVGTagElem } from "../helper";
import { mergeLabelCharLabelNum } from "../labelHelper";
import { createLabel, removeLabel } from "../stateHelper";
import BaseElem from "./BaseElem";
import Elems from "./Elems";
import LabelStyle from "./LabelStyle";

export default class LabelElem extends BaseElem {
    protected labelElem: SVGElement
    protected label: string
    protected relativeX: number
    protected relativeY: number
    protected isLabelShow: boolean
    protected labelStroke: string
    protected labelFill: string
    protected elemType: ElemType

    public constructor(elem: SVGElement, parentX: number, parentY: number, label: Nullable<string>, isLabelShow: boolean, elemType: ElemType) {
        super(elem)

        this.relativeX = 5
        this.relativeY = 5
        this.elemType = elemType

        if (label == null) {
            const [labelChar, labelNum] = createLabel(this.elemType)

            this.label = mergeLabelCharLabelNum(labelChar, labelNum)
        } else {
            this.label = label
        }

        this.isLabelShow = isLabelShow
        this.labelStroke = "red"
        this.labelFill = "red"

        Elems.instance.setLabel(this.label, this.id)

        const labelElem = createSVGTagElem("text")
        labelElem.setAttribute("x", (parentX + this.relativeX).toString())
        labelElem.setAttribute("y", (parentY + this.relativeY).toString())
        labelElem.classList.add("cursor-pointer", "user-select-none")
        labelElem.innerHTML = this.label
        if (!this.isLabelShow) {
            labelElem.setAttribute("opacity", "0")
        }
        labelElem.setAttribute("stroke", this.labelStroke)
        labelElem.setAttribute("fill", this.labelFill)

        this.labelElem = labelElem

        Elems.instance.appendChild(this.labelElem)
    }

    public showLabel() {
        if (!this.isLabelShow) {
            this.isLabelShow = true
            this.labelElem.setAttribute("opacity", "1")
        }
    }

    public hideLabel() {
        if (this.isLabelShow) {
            this.isLabelShow = false
            this.labelElem.setAttribute("opacity", "0")
        }
    }

    public setLabelParentX(x: number) {
        this.labelElem.setAttribute("x", (x + this.relativeX).toString())
    }

    public setLabelParentY(y: number) {
        this.labelElem.setAttribute("y", (y + this.relativeY).toString())
    }

    public getLabel(): string {
        return this.label
    }

    public setLabel(label: string) {
        this.label = label
        this.labelElem.innerHTML = this.label
    }

    public getElemType(): ElemType {
        return this.elemType
    }

    public setLabelStroke(labelStroke: string) {
        this.labelStroke = labelStroke
        this.labelElem.setAttribute("stroke", this.labelStroke)
    }

    public setLabelFill(labelFill: string) {
        this.labelFill = labelFill
        this.labelElem.setAttribute("fill", this.labelFill)
    }

    public setLabelStyle(style: LabelStyle) {
        if (style.fill != undefined) {
            this.setLabelFill(style.fill)
        }

        if (style.stroke != undefined) {
            this.setLabelStroke(style.stroke)
        }
    } 

    public removeLabel() {
        removeLabel(this.label, this.elemType)
    }
}