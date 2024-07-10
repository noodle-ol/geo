import Elem from "../elements/IElem"
import PointElem from "../elements/PointElem"
import BaseCommand from "./BaseCommand"
import Commands from "./Commands"

export default class LockCommand extends BaseCommand {
    static instance: LockCommand

    private constructor() {
        super()
    }

    public static getInstance(): LockCommand {
        if (!LockCommand.instance) {
            LockCommand.instance = new LockCommand()
            Commands.instance.set("lock", LockCommand.instance)
        }

        return LockCommand.instance
    }

    public execute(p: (Elem | string | number)[]) {
        if (p.length == 1 && p[0] instanceof PointElem) {
            p[0].lock()
        }
    }
}