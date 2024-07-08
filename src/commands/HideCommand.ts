import BaseElem from "../elements/BaseElem"
import Elem from "../elements/IElem"
import Commands from "./Commands"
import Command from "./ICommand"

export default class HideCommand implements Command{
    static instance: HideCommand

    private constructor() {}

    public static getInstance(): HideCommand {
        if (!HideCommand.instance) {
            HideCommand.instance = new HideCommand()
            Commands.instance.set("hide", HideCommand.instance)
        }

        return HideCommand.instance
    }

    public execute(p: (Elem | string | number)[]) {
        if (p.length == 1 && p[0] instanceof BaseElem) {
            p[0].hide()
        }
    }

    public onmousedown(_e: MouseEvent) {}

    public onmousemove(_e: MouseEvent) {}

    public onmouseup(_e: MouseEvent) {}

    public onleave() {}
}