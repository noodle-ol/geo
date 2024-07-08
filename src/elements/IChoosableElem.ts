import Elem from "./IElem";

export default interface ChoosableElem extends Elem {
    unchoose: () => void
    choose: () => void
}