import { createLabel } from "../stateHelper"
import BaseElem from "./BaseElem"
import ChoosableElem from "./IChoosableElem"
import Elem from "./IElem"
import LabelElem from "./LabelElem"

export default class Elems {
    static instance: Elems
    private mapElem: Map<number, Elem>
    private mapLabel: Map<string, number>
    private selectedElem: Nullable<ChoosableElem>
    private svgElem: SVGElement

    private constructor(svgElem: SVGElement) {
        this.mapElem = new Map<number, Elem>()
        this.mapLabel = new Map<string, number>()
        this.selectedElem = null
        this.svgElem = svgElem
    }

    public static getInstance(svgElem: SVGElement): Elems {
        if (!Elems.instance) {
            Elems.instance = new Elems(svgElem)
        }

        return Elems.instance
    }

    public appendChild(elem: SVGElement) {
        this.svgElem.appendChild(elem)
    }

    public set(id: number, elem: Elem) {
        this.mapElem.set(id, elem)
    }

    public get(id: number): Nullable<Elem> {
        const elem = this.mapElem.get(id)
        if (!elem) {
            return null
        }

        return elem
    }

    public setLabel(label: string, id: number) {
        this.mapLabel.set(label, id)
    }

    public getByLabel(label: string): Nullable<Elem> {
        const id = this.mapLabel.get(label)
        if (!id) {
            return null
        }

        return this.get(id)
    }

    public select(elem: Elem) {
        if (elem instanceof BaseElem) {
            if (this.selectedElem != null) {
                this.selectedElem.unchoose()
            }

            this.selectedElem = elem
            this.selectedElem.choose()
        }
    }

    public unselect() {
        if (this.selectedElem != null) {
            this.selectedElem.unchoose()
            this.selectedElem = null
        }
    }

    public getSelectedElem(): Nullable<Elem> {
        return this.selectedElem
    }

    public changeLabel(elem: LabelElem, label: string) {
        const id = this.mapLabel.get(label)
        if (id != null) {
            const oldElem = this.mapElem.get(id)
            if (oldElem != null && oldElem instanceof LabelElem) {
                const [labelChar, labelNum] = createLabel()
                let oldElemLabel = ""

                if (labelNum == 0) {
                    oldElemLabel = labelChar
                } else {
                    oldElemLabel = labelChar + labelNum
                }

                oldElem.setLabel(oldElemLabel)
                this.mapLabel.set(oldElemLabel, id)
            }
        }

        elem.setLabel(label)
        this.mapLabel.set(label, elem.getId())
    }
}