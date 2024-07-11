import PointElem from "./elements/PointElem"

const SVGNS = "http://www.w3.org/2000/svg"

export const createSVGTagElem = (elem: string) => document.createElementNS(SVGNS, elem)

export const distance = (x1: number, y1: number, x2: number, y2: number) => Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))

export const pointDistance = (p1: PointElem, p2: PointElem) => distance(p1.getX(), p1.getY(), p2.getX(), p2.getY())