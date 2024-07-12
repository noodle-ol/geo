import {createSVGTagElem} from "../helpers/helper"
import Elem from "./IElem"

export default class SVGElem {
    private width: number
    private height: number
    private elem: SVGElement

    public constructor(width: number, height: number) {
        this.width = width
        this.height = height

        const svgElem = createSVGTagElem("svg")
        svgElem.setAttribute("version", "1.1")
        svgElem.setAttribute("width", this.width.toString())
        svgElem.setAttribute("height", this.height.toString())
        svgElem.setAttribute("viewBox", `-${this.width/2} -${this.height/2} ${this.width} ${this.height}`)

        globalThis.coorCenterX = this.width/2
        globalThis.coorCenterY = this.height/2

        this.elem = svgElem
    }

    public appendChild(elem: Elem) {
        this.elem.appendChild(elem.getElem())
    }

    public getElem(): SVGElement {
        return this.elem
    }

    public setWidth(width: number) {
        this.width = width
        this.elem.setAttribute("width", this.width.toString())
    }

    public setHeight(height: number) {
        this.height = height
        this.elem.setAttribute("height", this.height.toString())
    }
}