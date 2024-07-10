import { ElemType } from "./enum/ElemType"
import { compareLabel, isValidChar, parseLabel } from "./labelHelper"

const updateNextLabel = (labelChar: string, labelNum: number, elemType: ElemType) => {
    if (elemType == ElemType.Point) {
        globalThis.nextPointLabelChar = labelChar
        globalThis.nextPointLabelNum = labelNum
    } else if (elemType == ElemType.Curve) {
        globalThis.nextCurveLabelChar = labelChar
        globalThis.nextCurveLabelNum = labelNum
    }
}

export const createLabel = (elemType: ElemType): [string, number] => {
    let labelPointChar = globalThis.nextPointLabelChar
    let labelPointNum = globalThis.nextPointLabelNum

    let endChar = ""
    let startChar = ""
    if (elemType == ElemType.Point) {
        endChar = "Z"
        startChar = "A"
    } else if (elemType == ElemType.Curve) {
        endChar = "z"
        startChar = "a"
    } else {
        return ['', 0]
    }

    let nextLabelChar = labelPointChar
    let nextLabelNum = labelPointNum
    if (labelPointChar == endChar) {
        nextLabelChar = startChar
        nextLabelNum = labelPointNum + 1
    } else {
        nextLabelChar = String.fromCharCode(labelPointChar.charCodeAt(0) + 1)
    }

    const unusedLabels = getUnusedLabels(elemType)
    if (unusedLabels.length > 0) {
        const compareLabelResult = compareLabel(nextLabelChar, nextLabelNum, unusedLabels[0][0], unusedLabels[0][1])
        console.log(compareLabelResult)
        if (compareLabelResult == 1) {
            labelPointChar = unusedLabels[0][0]
            labelPointNum = unusedLabels[0][1]
        } else {
            updateNextLabel(nextLabelChar, nextLabelNum, elemType)
        }

        if (compareLabelResult != -1) {
            unusedLabels.shift()
        }
    } else {
        updateNextLabel(nextLabelChar, nextLabelNum, elemType)
    }

    return [labelPointChar, labelPointNum]
}

export const createId = (): number => {
    return globalThis.nextId++
}

const addUnusedLabel = (unusedLabels: [string, number][], char: string, num: number) => {
    if (unusedLabels.length == 0) {
        unusedLabels.push([char, num])
        return
    }

    for (let i = 0; i < unusedLabels.length; i++) {
        if (unusedLabels[i][1] < num) {
            continue
        }

        if (unusedLabels[i][0].charCodeAt(0) < char.charCodeAt(0)) {
            continue
        }

        unusedLabels.splice(i, 0, [char, num])
        return
    }
}

const getUnusedLabels = (elemType: ElemType): [string, number][] => {
    if (elemType == ElemType.Point) {
        return globalThis.unusedPointLabels
    } else if (elemType == ElemType.Curve) {
        return globalThis.unusedCurveLabels
    }

    return []
}

export const removeLabel = (label: string, elemType: ElemType) => {
    const [fromText, fromNum] = parseLabel(label)
    if (isValidChar(fromText, elemType)) {
        if (elemType == ElemType.Point) {
            addUnusedLabel(globalThis.unusedPointLabels, fromText, fromNum)
        } else if (elemType == ElemType.Curve) {
            addUnusedLabel(globalThis.unusedCurveLabels, fromText, fromNum)
        }
    }
}