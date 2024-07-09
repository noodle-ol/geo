import BaseElem from "../elements/BaseElem"
import Elem from "../elements/IElem"
import BaseCommand from "./BaseCommand"
import Commands from "./Commands"

export default class ShowCommand extends BaseCommand {
    static instance: ShowCommand

    private constructor() {
        super()
    }

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
}