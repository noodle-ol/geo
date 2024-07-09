import Elem from "../elements/IElem"
import LabelElem from "../elements/LabelElem"
import BaseCommand from "./BaseCommand"
import Commands from "./Commands"

export default class ShowLabelCommand extends BaseCommand {
    static instance: ShowLabelCommand

    private constructor() {
        super()
    }

    public static getInstance(): ShowLabelCommand {
        if (!ShowLabelCommand.instance) {
            ShowLabelCommand.instance = new ShowLabelCommand()
            Commands.instance.set("showLabel", ShowLabelCommand.instance)
        }

        return ShowLabelCommand.instance
    }

    public execute(p: (Elem | string | number)[]) {
        if (p.length == 1 && p[0] instanceof LabelElem) {
            p[0].showLabel()
        }
    }
}