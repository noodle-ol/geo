export const createLabel = (): [string, number] => {
    const labelChar = globalThis.nextLabelChar
    const labelNum = globalThis.nextLabelNum

    if (labelChar == "Z") {
        globalThis.nextLabelChar = "A"
        globalThis.nextLabelNum++
    } else {
        globalThis.nextLabelChar = String.fromCharCode(labelChar.charCodeAt(0) + 1)
    }

    return [labelChar, labelNum]
}

export const createId = (): number => {
    return globalThis.nextId++
}