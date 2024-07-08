import { createId } from "../stateHelper";
import Elems from "./Elems";
import ChoosableElem from "./IChoosableElem";

export default class BaseElem implements ChoosableElem {
    protected elem: SVGElement
    protected id: number

    public constructor(elem: SVGElement) {
        this.elem = elem
        this.id = createId()

        Elems.instance.set(this.id, this)
        Elems.instance.appendChild(this.elem)
    }

    public getElem(): SVGElement {
        return this.elem
    }

    public remove() {
        this.elem.remove()
    }

    public unchoose() {}

    public choose() {}

    public onmousedown(_e: MouseEvent) {}

    public onmousemove(_e: MouseEvent) {}
}