import CurveElem from "./CurveElem"

export default class CurveElems {
    static instance: CurveElems
    private elems: CurveElem[]

    private constructor() {
        this.elems = []
    }

    public static getInstance(): CurveElems {
        if (!CurveElems.instance) {
            CurveElems.instance = new CurveElems()
        }

        return CurveElems.instance
    }

    public push(elem: CurveElem) {
        this.elems.push(elem)
    }

    public find(x: number, y: number) {
        for (let i = 0; i < this.elems.length; i++) {
            const curveElem: CurveElem = this.elems[i]

            if (curveElem.getIsShow() && curveElem.isClick(x, y)) {
                return curveElem
            }
        }

        return null
    }
}