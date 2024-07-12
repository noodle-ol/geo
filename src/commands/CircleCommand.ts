import { getCoorByMouseEvent } from "../helpers/coorHelper";
import CircleElem from "../elements/circle/CircleElem";
import Elems from "../elements/Elems";
import Elem from "../elements/IElem";
import PointElem from "../elements/point/PointElem";
import PointElems from "../elements/point/PointElems";
import BaseCommand from "./BaseCommand";
import Commands from "./Commands";

export default class CircleCommand extends BaseCommand {
    static instance: CircleCommand
    private isMouseDown: boolean
    private isMouseMove: boolean
    private isGhostCircle: boolean
    private tempCircleElem: Nullable<CircleElem>
    private tempCenterElem: Nullable<PointElem>
    private tempPElem: Nullable<PointElem>

    private constructor() {
        super()
        this.isMouseDown = false
        this.isMouseMove = false
        this.tempCircleElem = null
        this.tempCenterElem = null
        this.tempPElem = null
        this.isGhostCircle = false
    }

     public static getInstance(): CircleCommand {
        if (!CircleCommand.instance) {
            CircleCommand.instance = new CircleCommand()
            Commands.instance.set("circle", CircleCommand.instance)
        }

        return CircleCommand.instance
    }

    private drawCircleNoParam() {
        Commands.instance.setCurrentCommand(CircleCommand.instance)
    }

    private drawCircleWithPoints(center: PointElem, p: PointElem) {
        new CircleElem(center, p, null)
    }

    private drawCircleWithPointsWithLabel(center: PointElem, p: PointElem, label: string) {
        new CircleElem(center, p, label)
    }

    public execute(p: (Elem | string | number)[]) {
        if (p.length == 2 && p[0] instanceof PointElem && p[1] instanceof PointElem) {
            this.drawCircleWithPoints(p[0], p[1])
        } else if (p.length == 3 && p[0] instanceof PointElem && p[1] instanceof PointElem && typeof p[2] == "string") {
            this.drawCircleWithPointsWithLabel(p[0], p[1], p[2])
        } else {
            this.drawCircleNoParam()
        }
    }

    public onmousedown(e: MouseEvent) {
        const [clientX, clientY] = getCoorByMouseEvent(e)
        if (this.tempCircleElem == null) {
            this.isMouseDown = true
            let pointElem = PointElems.instance.find(clientX, clientY)
            if (pointElem == null) {
                pointElem = new PointElem(clientX, clientY, null, {})
                this.tempCenterElem = pointElem
            }

            const p = new PointElem(clientX, clientY, null, {isGhost: true})
            p.setIsGhost(true)
            this.tempPElem = p

            Elems.instance.select(pointElem)

            this.tempCircleElem = new CircleElem(pointElem, p, null)
        } else {
            let pointElem = PointElems.instance.find(clientX, clientY)
            const p = this.tempCircleElem.getP()
            if (pointElem == null) {
                p.move(clientX, clientY)
                p.setIsGhost(false)
                this.tempCircleElem.updateEquation()
            } else {
                this.tempCircleElem.setP(pointElem)
                p.remove()
            }

            this.isGhostCircle = false
            this.tempCircleElem = null
            this.tempCenterElem = null
            this.tempPElem = null
            Elems.instance.unselect()
        }
    }

    public onmousemove(e: MouseEvent) {
        if (this.isMouseDown || this.isGhostCircle) {
            if (this.tempCircleElem != null) {
                const p = this.tempCircleElem.getP()
                const [clientX, clientY] = getCoorByMouseEvent(e)
                p.move(clientX, clientY)
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
                if (this.tempCircleElem != null) {
                    let pointElem = PointElems.instance.find(clientX, clientY)
                    const p = this.tempCircleElem.getP()
                    if (pointElem == null) {
                        p.setIsGhost(false)
                        this.tempCircleElem.updateEquation()
                    } else {
                        this.tempCircleElem.setP(pointElem)
                        p.remove()
                    }

                    this.tempCircleElem = null
                    this.tempCenterElem = null
                    this.tempPElem = null
                    Elems.instance.unselect()
                }
            } else {
                this.isGhostCircle = true
            }
        }
    }

    public onleave() {
        if (this.tempCircleElem != null) {
            this.tempCircleElem.remove()
            this.tempCenterElem?.remove()
            this.tempPElem?.remove()
        }
    }
}