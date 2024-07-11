export const getCoor = (clientX: number, clientY: number): [number, number] => {
    return [clientX - globalThis.mainLeftMargin - globalThis.coorCenterX, clientY - globalThis.coorCenterY]
}

export const getCoorByMouseEvent = (e: MouseEvent): [number, number] => {
    return getCoor(e.clientX, e.clientY)
}