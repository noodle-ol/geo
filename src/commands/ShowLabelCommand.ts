import { getCoorByMouseEvent } from "../helpers/coorHelper"
import Elem from "../elements/IElem"
import LabelElem from "../elements/label/LabelElem"
import PointElems from "../elements/point/PointElems"
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

    private showLabelNoParam() {
        Commands.instance.setCurrentCommand(ShowLabelCommand.instance)
    }

    public execute(p: (Elem | string | number)[]) {
        if (p.length == 0) {
            this.showLabelNoParam()
        } else if (p.length == 1 && p[0] instanceof LabelElem) {
            p[0].showLabel()
        }
    }

    public onmousedown(e: MouseEvent) {
        const [clientX, clientY] = getCoorByMouseEvent(e)
        let pointElem = PointElems.instance.find(clientX, clientY)
        if (pointElem != null && pointElem.getIsShow()) {
            pointElem.showLabel()
        }
    }
}