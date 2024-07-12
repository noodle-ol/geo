export const createLineEquation = (x1: number, y1: number, x2: number, y2: number): (x: number, y: number) => number => {
    if (x1 == x2) {
        return (x: number, _y: number): number => {
            return x - x1
        }
    } else {
        return (x: number, y: number): number => {
            return y - y2 - (y1 - y2) * (x - x2) / (x1 - x2)
        }
    }
}

export const createLineDistanceEquation = (x1: number, y1: number, x2: number, y2: number): (x: number, y: number) => number => {
    if (x1 == x2) {
        return (x: number, _y: number): number => {
            return Math.abs(x - x1)
        }
    } else {
        return (x: number, y: number): number => {
            return Math.abs(y - y2 - (y1 - y2) * (x - x2) / (x1 - x2)) / Math.sqrt(1 + (Math.pow(y1 - y2, 2) / Math.pow(x1 - x2, 2)))
        }
    }
}

export const createCircleEquation = (x1: number, y1: number, x2: number, y2: number): (x: number, y: number) => number => {
    return (x: number, y: number): number => {
        return Math.pow(x - x1, 2) + Math.pow(y - y1, 2) - Math.pow(x2 - x1, 2) - Math.pow(y2 - y1, 2)
    }
}

export const createCircleDistanceEquation = (x1: number, y1: number, x2: number, y2: number): (x: number, y: number) => number => {
    return (x: number, y: number): number => {
        return Math.abs(Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2)) - Math.sqrt(Math.pow(x2 - x1, 2) - Math.pow(y2 - y1, 2)))
    }
}