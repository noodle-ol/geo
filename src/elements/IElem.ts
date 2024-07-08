export default interface Elem {
    getElem: () => SVGElement
    remove: () => void
    onmousedown: (e: MouseEvent) => void
    onmousemove: (e: MouseEvent) => void
}