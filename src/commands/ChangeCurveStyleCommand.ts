import CurveElem from "../elements/curve/CurveElem"
import CurveStyle from "../elements/curve/CurveStyle"
import Elems from "../elements/Elems"
import Elem from "../elements/IElem"
import BaseCommand from "./BaseCommand"
import Commands from "./Commands"

export default class ChangeCurveStyleCommand extends BaseCommand {
    static instance: ChangeCurveStyleCommand

    private constructor() {
        super()
    }

    public static getInstance(): ChangeCurveStyleCommand {
        if (!ChangeCurveStyleCommand.instance) {
            ChangeCurveStyleCommand.instance = new ChangeCurveStyleCommand()
            Commands.instance.set("changeCurveStyle", ChangeCurveStyleCommand.instance)
        }

        return ChangeCurveStyleCommand.instance
    }

    private parseCurveStyle(s: string): CurveStyle {
        return JSON.parse(s) as CurveStyle
    }

    public execute(p: (Elem | string | number)[]) {
        if (p.length == 2 && p[0] instanceof CurveElem && typeof p[1] == "string") {
            p[0].setStyle(this.parseCurveStyle(p[1]))
        } else if (p.length == 2 && typeof p[0] == "string" && typeof p[1] == "string") {
            const elem = Elems.instance.getByLabel(p[0])
            if (elem != null && elem instanceof CurveElem) {
                elem.setStyle(this.parseCurveStyle(p[1]))
            }
        }
    }
}