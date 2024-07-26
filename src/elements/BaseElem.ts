import { createId } from "../helpers/stateHelper";
import Elems from "./Elems";
import ChoosableElem from "./IChoosableElem";

export default class BaseElem implements ChoosableElem {
    protected elem: SVGElement
    protected id: number
    protected deprecated: boolean
    protected isShowTrack: boolean

    public constructor(elem: SVGElement) {
        this.elem = elem
        this.id = createId()
        this.deprecated = false
        this.isShowTrack = false

        Elems.instance.set(this.id, this)
        Elems.instance.appendChild(this.elem)
    }

    public getElem(): SVGElement {
        return this.elem
    }

    public getId(): number {
        return this.id
    }

    public remove() {
        this.elem.remove()
    }

    public unchoose() {}

    public choose() {}

    public hide() {}

    public show() {}

    public onmousedown(_e: MouseEvent) {}

    public onmousemove(_e: MouseEvent) {}
    
    public showTrack() {
        this.isShowTrack = true
    }

    public unshowTrack() {
        this.isShowTrack = false
    }
}