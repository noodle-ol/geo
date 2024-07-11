import { getCoorByMouseEvent } from "../coorHelper"
import Elem from "../elements/IElem"
import LabelElem from "../elements/LabelElem"
import PointElems from "../elements/PointElems"
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

    private hideLabelNoParam() {
        Commands.instance.setCurrentCommand(HideLabelCommand.instance)
    }

    public execute(p: (Elem | string | number)[]) {
        if (p.length == 0) {
            this.hideLabelNoParam()
        } else if (p.length == 1 && p[0] instanceof LabelElem) {
            p[0].hideLabel()
        }
    }

    public onmousedown(e: MouseEvent) {
        const [clientX, clientY] = getCoorByMouseEvent(e)
        let pointElem = PointElems.instance.find(clientX, clientY)
        if (pointElem != null && pointElem.getIsShow()) {
            pointElem.hideLabel()
        }
    }
}