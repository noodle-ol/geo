export default class CurveEquation {
    private equation: (x: number, y: number) => number
    private distanceEquation: (x: number, y: number) => number

    public constructor(equation: (x: number, y: number) => number, distanceEquation: (x: number, y: number) => number) {
        this.equation = equation
        this.distanceEquation = distanceEquation
    }

    public isSolution(x: number, y: number): boolean {
        return this.equation(x, y) == 0
    }

    public distance(x: number, y: number): number {
        return this.distanceEquation(x, y)
    }
}