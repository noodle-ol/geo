import PointElem from "./elements/PointElem"

const SVGNS = "http://www.w3.org/2000/svg"

export const createSVGTagElem = (elem: string) => document.createElementNS(SVGNS, elem)

export const pointDistance = (p1: PointElem, p2: PointElem) => Math.sqrt((p1.getX() - p2.getX())*(p1.getX() - p2.getX()) + (p1.getY() - p2.getY())*(p1.getY() - p2.getY()))