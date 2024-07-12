import Elems from "../elements/Elems"
import Elem from "../elements/IElem"
import LabelElem from "../elements/label/LabelElem"
import BaseCommand from "./BaseCommand"
import Commands from "./Commands"

export default class ChangeLabelCommand extends BaseCommand {
    static instance: ChangeLabelCommand

    private constructor() {
        super()
    }

    public static getInstance(): ChangeLabelCommand {
        if (!ChangeLabelCommand.instance) {
            ChangeLabelCommand.instance = new ChangeLabelCommand()
            Commands.instance.set("changeLabel", ChangeLabelCommand.instance)
        }

        return ChangeLabelCommand.instance
    }

    public execute(p: (Elem | string | number)[]) {
        if (p.length == 2 && typeof p[0] == "string" && typeof p[1] == "string") {
            if (!isNaN(parseFloat(p[1]))) {
                return
            }

            const elem = Elems.instance.getByLabel(p[0])
            if (elem != null && elem instanceof LabelElem) {
                Elems.instance.changeLabel(elem, p[1])
            }
        } else if (p.length == 2 && p[0] instanceof LabelElem && typeof p[1] == "string") {
            if (!isNaN(parseFloat(p[1]))) {
                return
            }

            Elems.instance.changeLabel(p[0], p[1])
        } 
    }
}