import Elems from "../elements/Elems"
import Elem from "../elements/IElem"
import LabelElem from "../elements/LabelElem"
import LabelStyle from "../elements/LabelStyle"
import BaseCommand from "./BaseCommand"
import Commands from "./Commands"

export default class ChangeLabelStyleCommand extends BaseCommand {
    static instance: ChangeLabelStyleCommand

    private constructor() {
        super()
    }

    public static getInstance(): ChangeLabelStyleCommand {
        if (!ChangeLabelStyleCommand.instance) {
            ChangeLabelStyleCommand.instance = new ChangeLabelStyleCommand()
            Commands.instance.set("changeLabelStyle", ChangeLabelStyleCommand.instance)
        }

        return ChangeLabelStyleCommand.instance
    }

    private parseLabelStyle(s: string): LabelStyle {
        return JSON.parse(s) as LabelStyle
    }

    public execute(p: (Elem | string | number)[]) {
        if (p.length == 2 && p[0] instanceof LabelElem && typeof p[1] == "string") {
            p[0].setLabelStyle(this.parseLabelStyle(p[1]))
        } else if (p.length == 2 && typeof p[0] == "string" && typeof p[1] == "string") {
            const elem = Elems.instance.getByLabel(p[0])
            if (elem != null && elem instanceof LabelElem) {
                elem.setLabelStyle(this.parseLabelStyle(p[1]))
            }
        }
    }
}