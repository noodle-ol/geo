import {createSVGTagElem} from "../helper"
import Elem from "./IElem"

export default class PointElem implements Elem {
    private x: number
    private y: number
    private r: number
    private stroke: string
    private fill: string
    private elem: SVGElement
    private onMoveCallbacks: ((p: PointElem) => void)[]

    public constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.r = 5
        this.stroke = "red"
        this.fill = "red"
        this.onMoveCallbacks = []

        const pointElem = createSVGTagElem("circle")
        pointElem.setAttribute("cx", this.x.toString())
        pointElem.setAttribute("cy", this.y.toString())
        pointElem.setAttribute("r", this.r.toString())
        pointElem.setAttribute("stroke", this.stroke)
        pointElem.setAttribute("fill", this.fill)
        pointElem.classList.add("cursor-pointer")

        this.elem = pointElem
    }

    public choose() {
        this.elem.setAttribute("r", (this.r * 2).toString())
    }

    public unchoose() {
        this.elem.setAttribute("r", this.r.toString())
    }

    public getX(): number {
        return this.x
    }

    public getY(): number {
        return this.y
    }

    public getElem(): SVGElement {
        return this.elem
    }

    public setR(r: number) {
        this.r = r
        this.elem.setAttribute("r", this.r.toString())
    }

    public getR(): number {
        return this.r
    }

    public remove() {
        this.elem.remove()
    }

    public isClick(x: number, y: number): boolean {
        return Math.abs(this.x - x) <= 9 && Math.abs(this.y - y) <= 9
    }

    public move(x: number, y: number) {
        this.x = x
        this.y = y

        this.elem.setAttribute("cx", this.x.toString())
        this.elem.setAttribute("cy", this.y.toString())

        for (const callback of this.onMoveCallbacks) {
            callback(this)
        }
    }

    public onMove(callback: (p: PointElem) => void) {
        this.onMoveCallbacks.push(callback)
    }
}