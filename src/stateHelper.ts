export const createPointLabel = (): [string, number] => {
    const labelPointChar = globalThis.nextPointLabelChar
    const labelPointNum = globalThis.nextPointLabelNum

    if (labelPointChar == "Z") {
        globalThis.nextPointLabelChar = "A"
        globalThis.nextPointLabelNum++
    } else {
        globalThis.nextPointLabelChar = String.fromCharCode(labelPointChar.charCodeAt(0) + 1)
    }

    return [labelPointChar, labelPointNum]
}

export const createCurveLabel = (): [string, number] => {
    const labelCurveChar = globalThis.nextCurveLabelChar
    const labelCurveNum = globalThis.nextCurveLabelNum

    if (labelCurveChar == "z") {
        globalThis.nextCurveLabelChar = "a"
        globalThis.nextCurveLabelNum++
    } else {
        globalThis.nextCurveLabelChar = String.fromCharCode(labelCurveChar.charCodeAt(0) + 1)
    }

    return [labelCurveChar, labelCurveNum]
}

export const createId = (): number => {
    return globalThis.nextId++
}