import Elem from "../elements/IElem"

export default interface Command {
    execute: (params: (Elem | string | number)[]) => void
    onmousedown: (e: MouseEvent) => void
    onmousemove: (e: MouseEvent) => void
    onmouseup: (e: MouseEvent) => void
    onleave: () => void
}