import BaseElem from "../elements/BaseElem"
import Elem from "../elements/IElem"
import BaseCommand from "./BaseCommand"
import Commands from "./Commands"

export default class HideCommand extends BaseCommand {
    static instance: HideCommand

    private constructor() {
        super()
    }

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
}