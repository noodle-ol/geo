import BaseElem from "../elements/BaseElem"
import Elem from "../elements/IElem"
import BaseCommand from "./BaseCommand"
import Commands from "./Commands"

export default class RemoveCommand extends BaseCommand {
    static instance: RemoveCommand

    private constructor() {
        super()
    }

    public static getInstance(): RemoveCommand {
        if (!RemoveCommand.instance) {
            RemoveCommand.instance = new RemoveCommand()
            Commands.instance.set("remove", RemoveCommand.instance)
        }

        return RemoveCommand.instance
    }

    public execute(p: (Elem | string | number)[]) {
        if (p.length == 1 && p[0] instanceof BaseElem) {
            p[0].remove()
        }
    }
}