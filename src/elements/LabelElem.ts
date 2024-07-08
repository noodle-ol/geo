import { createSVGTagElem } from "../helper";
import { createLabel } from "../stateHelper";
import BaseElem from "./BaseElem";
import Elems from "./Elems";

export default class LabelElem extends BaseElem {
    protected labelElem: SVGElement
    protected label: string
    protected relativeX: number
    protected relativeY: number
    protected isLabelShow: boolean

    public constructor(elem: SVGElement, parentX: number, parentY: number, label: Nullable<string>, isLabelShow: boolean) {
        super(elem)

        this.relativeX = 5
        this.relativeY = 5

        if (label == null) {
            const [labelChar, labelNum] = createLabel()

            if (labelNum == 0) {
                this.label = labelChar
            } else {
                this.label = labelChar + labelNum
            }
        } else {
            this.label = label
        }

        this.isLabelShow = isLabelShow

        Elems.instance.setLabel(this.label, this.id)

        const labelElem = createSVGTagElem("text")
        labelElem.setAttribute("x", (parentX + this.relativeX).toString())
        labelElem.setAttribute("y", (parentY + this.relativeY).toString())
        labelElem.classList.add("cursor-pointer")
        labelElem.innerHTML = this.label
        if (!this.isLabelShow) {
            labelElem.setAttribute("opacity", "0")
        }

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
}