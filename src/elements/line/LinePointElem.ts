import CurvePointElem from "../curve/CurvePointElem";
import PointElemParam from "../point/PointElemParam";
import LineElem from "./LineElem";

export default class LinePointElem extends CurvePointElem {
    private ratio: number

    public constructor(x: number, y: number, label: Nullable<string>, lineElem: LineElem, params: PointElemParam) {
        super(x, y, label, lineElem, params)
        this.ratio = lineElem.getRatio(x, y)

        lineElem.onMove((_c) => {
            const [x, y] = lineElem.getPointByRatio(this.ratio)
            this.move(x, y)
        })
    }

    public onmousemove(_e: MouseEvent) {
        if (!this.isLock) {
            const [x, y] = this.curveElem.getFoot(globalThis.mouseX, globalThis.mouseY)
            if (this.curveElem instanceof LineElem) {
                this.ratio = this.curveElem.getRatio(x, y)
            }
            this.move(x, y)
        }
    }
}