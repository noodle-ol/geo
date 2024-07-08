import BaseElem from "../elements/BaseElem"
import Elem from "../elements/IElem"
import Commands from "./Commands"
import Command from "./ICommand"

export default class ShowCommand implements Command{
    static instance: ShowCommand

    private constructor() {}

    public static getInstance(): ShowCommand {
        if (!ShowCommand.instance) {
            ShowCommand.instance = new ShowCommand()
            Commands.instance.set("show", ShowCommand.instance)
        }

        return ShowCommand.instance
    }

    public execute(p: (Elem | string | number)[]) {
        if (p.length == 1 && p[0] instanceof BaseElem) {
            p[0].show()
        }
    }

    public onmousedown(_e: MouseEvent) {}

    public onmousemove(_e: MouseEvent) {}

    public onmouseup(_e: MouseEvent) {}

    public onleave() {}
}