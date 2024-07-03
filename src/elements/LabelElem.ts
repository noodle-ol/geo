import { createSVGTagElem } from "../helper";
import Elem from "./IElem";
import PointElem from "./PointElem";

export default class LabelElem implements Elem {
    private parentElem: PointElem
    private elem: SVGElement
    private label: string


    public constructor(parentElem: PointElem, labelChar: string, labelNum: number) {
        this.parentElem = parentElem

        if (labelNum == 0) {
            this.label = labelChar
        } else {
            this.label = labelChar + labelNum
        }

        const elem = createSVGTagElem("text")
        elem.setAttribute("x", this.parentElem.getX().toString())
        elem.setAttribute("y", this.parentElem.getY().toString())
        elem.classList.add("cursor-pointer")
        elem.innerHTML = this.label

        this.elem = elem

        this.parentElem.onMove((p: PointElem) => {
            this.elem.setAttribute("x", p.getX().toString())
            this.elem.setAttribute("y", p.getY().toString())
        })
    }

    public getElem(): SVGElement {
        return this.elem
    }

    public remove() {
        this.elem.remove()
    }

    public onclick(callback: (elem: PointElem) => void) {
        this.elem.onclick = (_e) => {
            callback(this.parentElem)
        }
    }

    public setLabelParts(labelChar: string, labelNum: number) {
        labelChar = labelChar
        labelNum = labelNum

        if (labelNum == 0) {
            this.label = labelChar
        } else {
            this.label = labelChar + labelNum
        }
    }

    public setLabel(label: string) {
        this.label = label
    }

    public getLabel(): string {
        return this.label
    }
}