import {createSVGTagElem} from "../helper"
import LabelElem from "./LabelElem"
import PointElems from "./PointElems"

export default class PointElem extends LabelElem {
    private x: number
    private y: number
    private r: number
    private stroke: string
    private fill: string
    private onMoveCallbacks: ((p: PointElem) => void)[]
    private isShow: boolean

    public constructor(x: number, y: number, label: Nullable<string>, isShowLabel: boolean = true) {
        const stroke = "red"
        const fill = "red"
        const r = 5
        const isShow = true

        const pointElem = createSVGTagElem("circle")
        pointElem.setAttribute("cx", x.toString())
        pointElem.setAttribute("cy", y.toString())
        pointElem.setAttribute("r", r.toString())
        pointElem.setAttribute("stroke", stroke)
        pointElem.setAttribute("fill", fill)
        pointElem.classList.add("cursor-pointer")

        super(pointElem, x, y, label, isShowLabel)

        this.isShow = isShow
        this.x = x
        this.y = y
        this.r = r
        this.stroke = stroke
        this.fill = fill
        this.onMoveCallbacks = []

        PointElems.instance.push(this)
    }

    public choose() {
        this.elem.setAttribute("r", (this.r * 2).toString())
    }

    public unchoose() {
        this.elem.setAttribute("r", this.r.toString())
    }

    public hide() {
        if (this.isShow) {
            this.elem.setAttribute("stroke-opacity", "0")
            this.elem.setAttribute("fill-opacity", "0")
            this.isShow = false
            this.hideLabel()
        }
    }

    public show() {
        if (!this.isShow) {
            this.elem.setAttribute("stroke-opacity", "1")
            this.elem.setAttribute("fill-opacity", "1")
            this.isShow = true
            this.showLabel()
        }

    }

    public getX(): number {
        return this.x
    }

    public setX(x: number) {
        this.x = x
        this.elem.setAttribute("cx", x.toString())
    }

    public getY(): number {
        return this.y
    }

    public setY(y: number) {
        this.y = y
        this.elem.setAttribute("cy", y.toString())
    }

    public getStroke(): string {
        return this.stroke
    }

    public setStroke(stroke: string) {
        this.stroke = stroke
        this.elem.setAttribute("stroke", this.stroke)
    }

    public getFill(): string {
        return this.fill
    }

    public setFill(fill: string) {
        this.fill = fill
        this.elem.setAttribute("fill", this.fill)
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

    public getIsShow(): boolean {
        return this.isShow
    }

    public remove() {
        this.labelElem.remove()
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
        this.setLabelParentX(this.x)
        this.setLabelParentY(this.y)

        for (const callback of this.onMoveCallbacks) {
            callback(this)
        }
    }

    public onMove(callback: (p: PointElem) => void) {
        this.onMoveCallbacks.push(callback)
    }


    public onmousedown(_e: MouseEvent) {
        
    }

    public onmousemove(_e: MouseEvent) {
        this.move(globalThis.mouseX, globalThis.mouseY)
    }
}