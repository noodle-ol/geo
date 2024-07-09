export default interface Elem {
    getId: () => number
    getElem: () => SVGElement
    remove: () => void
    onmousedown: (e: MouseEvent) => void
    onmousemove: (e: MouseEvent) => void
}