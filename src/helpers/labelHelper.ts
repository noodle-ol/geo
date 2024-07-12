import { ElemType } from "../enum/ElemType"

export const parseLabel = (label: string): [text: string, num: number] => {
    const labelParts = label.split("_")
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

export const isValidChar = (text: string, elemType: ElemType): boolean => {
    if (text.length > 1) {
        return false
    }

    const charCode = text.charCodeAt(0)

    if (elemType == ElemType.Point) {
        return charCode > 64 && charCode < 91
    } else if (elemType == ElemType.Curve) {
        return charCode > 96 && charCode < 123
    }

    return false
}

export const compareLabel = (firstChar: string, firstNum: number, secondChar: string, secondNum: number): number => {
    if (firstNum > secondNum) {
        return 1
    } else if (firstNum < secondNum) {
        return -1
    } else {
        if (firstChar.charCodeAt(0) > secondChar.charCodeAt(0)) {
            return 1
        } else if (firstChar.charCodeAt(0) < secondChar.charCodeAt(0)) {
            return -1
        } else {
            return 0
        }
    }
}

export const mergeLabelCharLabelNum = (char: string, num: number): string => {
    if (num == 0) {
        return char
    } else {
        return char + "_" + num
    }
}