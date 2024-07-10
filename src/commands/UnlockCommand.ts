import Elem from "../elements/IElem"
import PointElem from "../elements/PointElem"
import BaseCommand from "./BaseCommand"
import Commands from "./Commands"

export default class UnlockCommand extends BaseCommand {
    static instance: UnlockCommand

    private constructor() {
        super()
    }

    public static getInstance(): UnlockCommand {
        if (!UnlockCommand.instance) {
            UnlockCommand.instance = new UnlockCommand()
            Commands.instance.set("unlock", UnlockCommand.instance)
        }

        return UnlockCommand.instance
    }

    public execute(p: (Elem | string | number)[]) {
        if (p.length == 1 && p[0] instanceof PointElem) {
            p[0].unlock()
        }
    }
}