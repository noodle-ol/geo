import Elems from "../elements/Elems";
import Elem from "../elements/IElem";
import PointElems from "../elements/PointElems";
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
        const [clientX, clientY] = [e.clientX - globalThis.mainLeftMargin, e.clientY]
        let pointElem = PointElems.instance.find(clientX, clientY)
        if (pointElem != null) {
            Elems.instance.select(pointElem)
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