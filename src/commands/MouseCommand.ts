import { getCoorByMouseEvent } from "../helpers/coorHelper";
import CurveElems from "../elements/curve/CurveElems";
import Elems from "../elements/Elems";
import Elem from "../elements/IElem";
import PointElems from "../elements/point/PointElems";
import BaseCommand from "./BaseCommand";
import Commands from "./Commands";

export default class MouseCommand extends BaseCommand {
    static instance: MouseCommand
    private isMouseDown: boolean

    private constructor() {
        super()
        this.isMouseDown = false
    }

    public static getInstance(): MouseCommand {
        if (!MouseCommand.instance) {
            MouseCommand.instance = new MouseCommand()
            Commands.instance.set("mouse", MouseCommand.instance)
        }

        return MouseCommand.instance
    }

    public execute(_p: (Elem | string | number)[]) {}

    public onmousedown(e: MouseEvent) {
        this.isMouseDown = true
        const [clientX, clientY] = getCoorByMouseEvent(e)
        let pointElem = PointElems.instance.find(clientX, clientY)
        if (pointElem != null) {
            Elems.instance.select(pointElem)
            return
        }

        let curveElem = CurveElems.instance.find(clientX, clientY)
        if (curveElem != null) {
            Elems.instance.select(curveElem)
            return
        }

        Elems.instance.unselect()
    }

    public onmousemove(e: MouseEvent) {
        if (this.isMouseDown) {
            const selectedElem = Elems.instance.getSelectedElem()
            if (selectedElem != null) {
                selectedElem.onmousemove(e)
            }
        }
    }

    public onmouseup(_e: MouseEvent) {
        this.isMouseDown = false
    }
}