export default class CurveEquation {
    private equation: (x: number, y: number) => number

    public constructor(equation: (x: number, y: number) => number) {
        this.equation = equation
    }

    public isSolution(x: number, y: number): boolean {
        return this.equation(x, y) == 0
    }
}