import Elem from "../elements/IElem"
import Command from "./ICommand"

export default class BaseCommand implements Command {
    protected constructor() {}

    public execute(_p: (Elem | string | number)[]) {}

    public onmousedown(_e: MouseEvent) {}

    public onmousemove(_e: MouseEvent) {}

    public onmouseup(_e: MouseEvent) {}

    public onleave() {}
}