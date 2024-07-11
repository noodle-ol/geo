import { getCoorByMouseEvent } from "../coorHelper"
import Elems from "../elements/Elems"
import Elem from "../elements/IElem"
import LineElem from "../elements/LineElem"
import PointElem from "../elements/PointElem"
import PointElems from "../elements/PointElems"
import BaseCommand from "./BaseCommand"
import Commands from "./Commands"

export default class LineCommand extends BaseCommand {
    static instance: LineCommand
    private isMouseDown: boolean
    private isMouseMove: boolean
    private isGhostLine: boolean
    private tempLineElem: Nullable<LineElem>
    private tempStartPointElem: Nullable<PointElem>
    private tempEndPointElem: Nullable<PointElem>

    private constructor() {
        super()
        this.isMouseDown = false
        this.isMouseMove = false
        this.tempLineElem = null
        this.tempStartPointElem = null
        this.tempEndPointElem = null
        this.isGhostLine = false
    }

    public static getInstance(): LineCommand {
        if (!LineCommand.instance) {
            LineCommand.instance = new LineCommand()
            Commands.instance.set("line", LineCommand.instance)
        }

        return LineCommand.instance
    }

    private drawLineNoParam() {
        Commands.instance.setCurrentCommand(LineCommand.instance)
    }

    private drawLineWithPoints(startPoint: PointElem, endPoint: PointElem) {
        new LineElem(startPoint, endPoint, null)
    }

    private drawLineWithPointsWithLabel(startPoint: PointElem, endPoint: PointElem, label: string) {
        new LineElem(startPoint, endPoint, label)
    }

    public execute(p: (Elem | string | number)[]) {
        if (p.length == 2 && p[0] instanceof PointElem && p[1] instanceof PointElem) {
            this.drawLineWithPoints(p[0], p[1])
        } else if (p.length == 3 && p[0] instanceof PointElem && p[1] instanceof PointElem && typeof p[2] == "string") {
            this.drawLineWithPointsWithLabel(p[0], p[1], p[2])
        } else {
            this.drawLineNoParam()
        }
    }

    public onmousedown(e: MouseEvent) {
        const [clientX, clientY] = getCoorByMouseEvent(e)
        if (this.tempLineElem == null) {
            this.isMouseDown = true
            let pointElem = PointElems.instance.find(clientX, clientY)
            if (pointElem == null) {
                pointElem = new PointElem(clientX, clientY, null, {})
                this.tempStartPointElem = pointElem
            }

            const endPoint = new PointElem(clientX, clientY, null, {isGhost: true})
            endPoint.setIsGhost(true)
            this.tempEndPointElem = endPoint

            Elems.instance.select(pointElem)

            this.tempLineElem = new LineElem(pointElem, endPoint, null)
        } else {
            let pointElem = PointElems.instance.find(clientX, clientY)
            const endPoint = this.tempLineElem.getEndPoint()
            if (pointElem == null) {
                endPoint.move(clientX, clientY)
                endPoint.setIsGhost(false)
                this.tempLineElem.updateEquation()
            } else {
                this.tempLineElem.setEndPoint(pointElem)
                endPoint.remove()
            }
            
            this.isGhostLine = false
            this.tempLineElem = null
            this.tempStartPointElem = null
            this.tempEndPointElem = null
            Elems.instance.unselect()
        }
    }

    public onmousemove(e: MouseEvent) {
        if (this.isMouseDown || this.isGhostLine) {
            if (this.tempLineElem != null) {
                const endPoint = this.tempLineElem.getEndPoint()
                const [clientX, clientY] = getCoorByMouseEvent(e)
                endPoint.move(clientX, clientY)
            }
        }

        if (this.isMouseDown) {
            this.isMouseMove = true
        }
    }

    public onmouseup(e: MouseEvent) {
        const [clientX, clientY] = getCoorByMouseEvent(e)
        if (this.isMouseDown) {
            this.isMouseDown = false
            if (this.isMouseMove) {
                this.isMouseMove = false
                if (this.tempLineElem != null) {
                    let pointElem = PointElems.instance.find(clientX, clientY)
                    const endPoint = this.tempLineElem.getEndPoint()
                    if (pointElem == null) {
                        endPoint.setIsGhost(false)
                        this.tempLineElem.updateEquation()
                    } else {
                        this.tempLineElem.setEndPoint(pointElem)
                        endPoint.remove()
                    }
                    this.tempLineElem = null
                    this.tempStartPointElem = null
                    this.tempEndPointElem = null
                    Elems.instance.unselect()
                }
            } else {
                this.isGhostLine = true
            }
        }
    }

    public onleave() {
        if (this.tempLineElem != null) {
            this.tempLineElem.remove()
            this.tempStartPointElem?.remove()
            this.tempEndPointElem?.remove()
        }
    }
}