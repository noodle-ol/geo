import PointElem from "./PointElem";

export default class PointElems {
    static instance: PointElems
    private elems: PointElem[]

    private constructor() {
        this.elems = []
    }

    public static getInstance(): PointElems {
        if (!PointElems.instance) {
            PointElems.instance = new PointElems()
        }

        return PointElems.instance
    }

    public push(elem: PointElem) {
        this.elems.push(elem)
    }

    public find(x: number, y: number) {
        for (let i = 0; i < this.elems.length; i++) {
            const pointElem: PointElem = this.elems[i]

            if (pointElem.getIsShow() && pointElem.isClick(x, y)) {
                return pointElem
            }
        }

        return null
    }
}