import PointElem from "../elements/point/PointElem";
import Action from "./IAction";

export default class CreatePointElemAction implements Action {
    private elem: PointElem

    public constructor(elem: PointElem) {
        this.elem = elem
    }

    public reverse() {
        this.elem.reverse()
    }

    public backward() {
        this.elem.backward()
    }

    public clean() {
        this.elem.remove()
    }
}