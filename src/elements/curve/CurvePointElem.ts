import CurveElem from "./CurveElem";
import PointElem from "../point/PointElem";
import PointElemParam from "../point/PointElemParam";

export default class CurvePointElem extends PointElem {
    private curveElem: CurveElem

    public constructor(x: number, y: number, label: Nullable<string>, curveElem: CurveElem, params: PointElemParam) {
        super(x, y, label, params)

        this.curveElem = curveElem
    }

    public onmousemove(_e: MouseEvent) {
        if (!this.isLock) {
            const [x, y] = this.curveElem.getFoot(globalThis.mouseX, globalThis.mouseY)
            this.move(x, y)
        }
    }
}