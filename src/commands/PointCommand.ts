import Elems from "../elements/Elems";
import Elem from "../elements/IElem";
import PointElem from "../elements/PointElem";
import PointElems from "../elements/PointElems";
import BaseCommand from "./BaseCommand";
import Commands from "./Commands";

export default class PointCommand extends BaseCommand {
    static instance: PointCommand
    private isMouseDown: boolean

    private constructor() {
        super()
        this.isMouseDown = false
    }

    public static getInstance(): PointCommand {
        if (!PointCommand.instance) {
            PointCommand.instance = new PointCommand()
            Commands.instance.set("point", PointCommand.instance)
        }

        return PointCommand.instance
    }

    private drawPointNoParam() {
        Commands.instance.setCurrentCommand(PointCommand.instance)
    }

    private drawPointWithCoor(x: number, y: number) {
        new PointElem(x, y, null)
    }

    private drawPointWithCoorAndLabel(x: number, y: number, label: string) {
        new PointElem(x, y, label)
    }

    public execute(p: (Elem | string | number)[]) {
        if (p.length == 2 && typeof p[0] == "number" && typeof p[1] == "number") {
            this.drawPointWithCoor(p[0], p[1])
        } else if (p.length == 3 && typeof p[0] == "number" && typeof p[1] == "number" && typeof p[2] == "string") {
            this.drawPointWithCoorAndLabel(p[0], p[1], p[2])
        } else {
            this.drawPointNoParam()
        }
    }

    public onmousedown(e: MouseEvent) {
        this.isMouseDown = true
        const [clientX, clientY] = [e.clientX - globalThis.mainLeftMargin, e.clientY]
        let pointElem = PointElems.instance.find(clientX, clientY)
        if (pointElem != null) {
            Elems.instance.select(pointElem)
            return
        }

        pointElem = new PointElem(clientX, clientY, null)
        Elems.instance.select(pointElem)
    }

    public onmousemove(e: MouseEvent) {
        if (this.isMouseDown) {
            const selectedElem = Elems.instance.getSelectedElem()
            if (selectedElem instanceof PointElem) {
                selectedElem.onmousemove(e)
            }
        }
    }

    public onmouseup(_e: MouseEvent) {
        this.isMouseDown = false
        Elems.instance.unselect()
    }

    public onleave() {
        Commands.instance.setDefaultCommand()
    }
}