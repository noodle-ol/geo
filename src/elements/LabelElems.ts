import LabelElem from "./LabelElem";
import PointElem from "./PointElem";

export default class LabelElems {
    private map: Map<string, LabelElem>
    private nextChar: string
    private nextNum: number
    private unusedLabels: [string, number][]

    public constructor() {
        this.map = new Map<string, LabelElem>()
        this.nextChar = "A"
        this.nextNum = 0
        this.unusedLabels = []
    }

    private findNextChar(c: string) {
        return String.fromCharCode(c.charCodeAt(0) + 1)
    }

    private findNextLabel() {
        if (this.nextChar == "Z") {
            this.nextChar = "A"
            this.nextNum++
        } else {
            this.nextChar = this.findNextChar(this.nextChar)
        }
    }

    public createLabel(pointElem: PointElem): LabelElem {
        const labelElem = new LabelElem(pointElem, this.nextChar, this.nextNum)
        if (this.unusedLabels.length > 0) {
            const compareLabelResult = this.compareLabel(this.nextChar, this.nextNum, this.unusedLabels[0][0], this.unusedLabels[0][1])
            if (compareLabelResult == 1) {
                labelElem.setLabelParts(this.unusedLabels[0][0], this.unusedLabels[0][1])
            } else {
                labelElem.setLabelParts(this.nextChar, this.nextNum)
                this.findNextLabel()
            }

            if (compareLabelResult != -1) {
                this.unusedLabels.shift()
            }
        } else {
            labelElem.setLabelParts(this.nextChar, this.nextNum)
            this.findNextLabel()
        }
        
        this.map.set(labelElem.getLabel(), labelElem)

        return labelElem
    }

    private parseLabel(label: string): [text: string, num: number] {
        const labelParts = label.split(":")
        if (labelParts.length < 2) {
            return [label, 0]
        }

        const text = labelParts[0]
        const num = labelParts.pop()

        if (num == undefined) {
            return [label, 0]
        }

        if (!isNaN(parseFloat(num))) {
            return [text, parseFloat(num)]
        }

        return [text, 0]
    }

    private isValidChar(text: string): boolean {
        if (text.length > 1) {
            return false
        }

        const charCode = text.charCodeAt(0)
        return charCode > 64 && charCode < 91
    }

    private addUnusedLabel(char: string, num: number) {
        for (let i = 0; i < this.unusedLabels.length; i++) {
            if (this.unusedLabels[i][1] < num) {
                continue
            }

            if (this.unusedLabels[i][0].charCodeAt(0) < char.charCodeAt(0)) {
                continue
            }

            this.unusedLabels.splice(i, 0, [char, num])
        }
    }

    private compareLabel(firstChar: string, firstNum: number, secondChar: string, secondNum: number): number {
        if (firstNum > secondNum) {
            return 1
        } else if (firstNum < secondNum) {
            return -1
        } else {
            if (firstChar.charCodeAt(0) < secondChar.charCodeAt(0)) {
                return 1
            } else if (firstChar.charCodeAt(0) > secondChar.charCodeAt(0)) {
                return -1
            } else {
                return 0
            }
        }
    }

    public changeLabel(from: string, to: string) {
        const fromLabelElem = this.map.get(from)
        if (fromLabelElem == null) {
            return 
        }

        const toLabelElem = this.map.get(to)
        const [toText, toNum] = this.parseLabel(to)
        if (toLabelElem != null) {
            toLabelElem.setLabelParts(toText, toNum + 1)
            this.map.set(toLabelElem.getLabel(), toLabelElem)
            return
        }

        fromLabelElem.setLabel(to)
        this.map.set(to, fromLabelElem)

        const [fromText, fromNum] = this.parseLabel(from)
        if (this.isValidChar(fromText)) {
            this.addUnusedLabel(fromText, fromNum)
        }

        this.map.delete(from)
    }
}