import BaseElem from "../elements/BaseElem"
import Elem from "../elements/IElem"
import PointElems from "../elements/PointElems"
import BaseCommand from "./BaseCommand"
import Commands from "./Commands"

export default class HideCommand extends BaseCommand {
    static instance: HideCommand

    private constructor() {
        super()
    }

    public static getInstance(): HideCommand {
        if (!HideCommand.instance) {
            HideCommand.instance = new HideCommand()
            Commands.instance.set("hide", HideCommand.instance)
        }

        return HideCommand.instance
    }

    private hideElemNoParam() {
        Commands.instance.setCurrentCommand(HideCommand.instance)
    }

    public execute(p: (Elem | string | number)[]) {
        if (p.length == 1 && p[0] instanceof BaseElem) {
            p[0].hide()
        } else {
            this.hideElemNoParam()
        }
    }

    public onmousedown(e: MouseEvent) {
        const [clientX, clientY] = [e.clientX - globalThis.mainLeftMargin, e.clientY]
        let pointElem = PointElems.instance.find(clientX, clientY)
        if (pointElem != null && pointElem.getIsShow()) {
            pointElem.hide()
        }
    }
}