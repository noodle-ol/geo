import Elem from "../elements/IElem"
import LabelElem from "../elements/LabelElem"
import BaseCommand from "./BaseCommand"
import Commands from "./Commands"

export default class HideLabelCommand extends BaseCommand {
    static instance: HideLabelCommand

    private constructor() {
        super()
    }

    public static getInstance(): HideLabelCommand {
        if (!HideLabelCommand.instance) {
            HideLabelCommand.instance = new HideLabelCommand()
            Commands.instance.set("hideLabel", HideLabelCommand.instance)
        }

        return HideLabelCommand.instance
    }

    public execute(p: (Elem | string | number)[]) {
        if (p.length == 1 && p[0] instanceof LabelElem) {
            p[0].hideLabel()
        }
    }
}