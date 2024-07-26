import { ElemType } from "../../enum/ElemType"
import {createSVGTagElem} from "../../helpers/helper"
import { mergeLabelCharLabelNum } from "../../helpers/labelHelper"
import { createLabel } from "../../helpers/stateHelper"
import Elems from "../Elems"
import LabelElem from "../label/LabelElem"
import PointElemParam from "./PointElemParam"
import PointElems from "./PointElems"
import PointStyle from "./PointStyle"

export default class PointElem extends LabelElem {
    protected x: number
    protected y: number
    protected r: number
    protected stroke: string
    protected fill: string
    protected onMoveCallbacks: ((p: PointElem) => void)[]
    protected onLeaveCallbacks: (() => void)[]
    protected isShow: boolean
    protected isGhost: boolean
    protected isLock: boolean

    public constructor(x: number, y: number, label: Nullable<string>, params: PointElemParam) {
        const stroke = "red"
        const fill = "red"
        const r = 5
        const isShow = true
        const isGhost = params.isGhost ? params.isGhost : false
        let isShowLabel = params.isShowLabel || params.isShowLabel == undefined ? true : false

        if (isGhost) {
            isShowLabel = false
            label = ''
        }

        const pointElem = createSVGTagElem("circle")
        pointElem.setAttribute("cx", x.toString())
        pointElem.setAttribute("cy", y.toString())
        pointElem.setAttribute("r", r.toString())
        pointElem.setAttribute("stroke", stroke)
        pointElem.setAttribute("fill", fill)
        pointElem.classList.add("cursor-pointer")

        super(pointElem, x, y, label, isShowLabel, ElemType.Point)

        this.isLock = false
        this.isShow = isShow
        this.isGhost = isGhost
        this.x = x
        this.y = y
        this.r = r
        this.stroke = stroke
        this.fill = fill
        this.onMoveCallbacks = []
        this.onLeaveCallbacks = []

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

    public reverse() {
        if (!this.deprecated) {
            this.deprecated = true
            this.elem.setAttribute("stroke-opacity", "0")
            this.elem.setAttribute("fill-opacity", "0")
            this.reverseLabel()
        }
    }

    public backward() {
        if (this.deprecated) {
            this.deprecated = false
            this.elem.setAttribute("stroke-opacity", "1")
            this.elem.setAttribute("fill-opacity", "1")
            this.backwardLabel()
        }
    }

    public lock() {
        this.isLock = true
    }

    public unlock() {
        this.isLock = false
    }

    public getIsLock(): boolean {
        return this.isLock
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

    public setIsGhost(isGhost: boolean) {
        this.isGhost = isGhost
        if (this.isGhost) {
            this.hide()
        } else {
            const [labelChar, labelNum] = createLabel(this.elemType)
            this.setLabel(mergeLabelCharLabelNum(labelChar, labelNum))
            this.show()
        }
    }

    public remove() {
        this.removeLabel()
        this.labelElem.remove()
        this.elem.remove()
        if (!this.isGhost) {
            for (const callback of this.onLeaveCallbacks) {
                callback()
            }
        }
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

        if (this.isShowTrack) {
            const pointElem = createSVGTagElem("circle")
            pointElem.setAttribute("cx", x.toString())
            pointElem.setAttribute("cy", y.toString())
            pointElem.setAttribute("r", this.r.toString())
            pointElem.setAttribute("stroke", this.stroke)
            pointElem.setAttribute("fill", this.fill)
            pointElem.classList.add("track")
            Elems.instance.appendChild(pointElem)
        }

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
        if (!this.isLock) {
            this.move(globalThis.mouseX, globalThis.mouseY)
        }
    }

    public onLeaveCallback(callback: () => void) {
        this.onLeaveCallbacks.push(callback)
    }

    public setStyle(style: PointStyle) {
        if (style.fill != undefined) {
            this.setFill(style.fill)
        }

        if (style.stroke != undefined) {
            this.setStroke(style.stroke)
        }
    }
}