import Elems from "../elements/Elems"
import Elem from "../elements/IElem"
import PointElem from "../elements/point/PointElem"
import PointStyle from "../elements/point/PointStyle"
import BaseCommand from "./BaseCommand"
import Commands from "./Commands"

export default class ChangePointStyleCommand extends BaseCommand {
    static instance: ChangePointStyleCommand

    private constructor() {
        super()
    }

    public static getInstance(): ChangePointStyleCommand {
        if (!ChangePointStyleCommand.instance) {
            ChangePointStyleCommand.instance = new ChangePointStyleCommand()
            Commands.instance.set("changePointStyle", ChangePointStyleCommand.instance)
        }

        return ChangePointStyleCommand.instance
    }

    private parsePointStyle(s: string): PointStyle {
        return JSON.parse(s) as PointStyle
    }

    public execute(p: (Elem | string | number)[]) {
        if (p.length == 2 && p[0] instanceof PointElem && typeof p[1] == "string") {
            p[0].setStyle(this.parsePointStyle(p[1]))
        } else if (p.length == 2 && typeof p[0] == "string" && typeof p[1] == "string") {
            const elem = Elems.instance.getByLabel(p[0])
            if (elem != null && elem instanceof PointElem) {
                elem.setStyle(this.parsePointStyle(p[1]))
            }
        }
    }
}