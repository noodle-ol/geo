import { createSVGTagElem } from "../helper";
import Elem from "./IElem";
import PointElem from "./PointElem";

export default class LabelElem implements Elem {
    private parentElem: PointElem
    private elem: SVGElement
    private label: string
    private relativeX: number
    private relativeY: number
    private isDrag: boolean
    private isMouseDown: boolean


    public constructor(parentElem: PointElem, labelChar: string, labelNum: number) {
        this.parentElem = parentElem
        this.relativeX = 5
        this.relativeY = 5
        this.isDrag = false
        this.isMouseDown = false

        if (labelNum == 0) {
            this.label = labelChar
        } else {
            this.label = labelChar + labelNum
        }

        const elem = createSVGTagElem("text")
        elem.setAttribute("x", (this.parentElem.getX() + this.relativeX).toString())
        elem.setAttribute("y", (this.parentElem.getY() + this.relativeY).toString())
        elem.classList.add("cursor-pointer")
        elem.innerHTML = this.label
        elem.onmousedown = (_e) => {
            this.isMouseDown = true
        }

        this.elem = elem

        this.parentElem.onMove((p: PointElem) => {
            this.elem.setAttribute("x", (p.getX() + this.relativeX).toString())
            this.elem.setAttribute("y", (p.getY() + this.relativeY).toString())
        })
    }

    public getElem(): SVGElement {
        return this.elem
    }

    public remove() {
        this.elem.remove()
    }

    public onclick(callback: (elem: PointElem) => void) {
        this.elem.onmouseup = (_e) => {
            if (!this.isDrag) {
                callback(this.parentElem)
            } else {
                this.isDrag = false
                this.isMouseDown = false
            }
        }
    }

    public getIsMouseDown(): boolean {
        return this.isMouseDown
    }

    public setIsDrag(isDrag: boolean) {
        this.isDrag = isDrag
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

    public setX(x: number) {
        this.elem.setAttribute("x", x.toString())
        this.relativeX = x - this.parentElem.getX()
    }

    public setY(y: number) {
        this.elem.setAttribute("y", y.toString())
        this.relativeY = y - this.parentElem.getY()
    }
}