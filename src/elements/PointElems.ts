import PointElem from "./PointElem";

export default class PointElems {
    private elems: PointElem[]

    public constructor() {
        this.elems = []
    }

    public push(elem: PointElem) {
        this.elems.push(elem)
    }

    public find(x: number, y: number) {
        for (let i = 0; i < this.elems.length; i++) {
            const pointElem: PointElem = this.elems[i]

            if (pointElem.isClick(x, y)) {
                return pointElem
            }
        }

        return null
    }
}