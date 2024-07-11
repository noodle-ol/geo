import Action from "./IAction"

export default class Actions {
    static instance: Actions

    private actionStack: Action[]
    private backwardActionStack: Action[]

    private constructor() {
        this.actionStack = []
        this.backwardActionStack =[]
    }

    public static getInstance(): Actions {
        if (!Actions.instance) {
            Actions.instance = new Actions()
        }

        return Actions.instance
    }

    public push(action: Action) {
        this.actionStack.push(action)

        if (this.backwardActionStack.length > 0) {
            for (const action of this.backwardActionStack) {
                action.clean()
            }
        }
    }

    public reverse() {
        const action = this.actionStack.pop()
        if (action) {
            action.reverse()
            this.backwardActionStack.push(action)
        }
    }

    public backward() {
        const action = this.backwardActionStack.pop()
        if (action) {
            action.backward()
            this.actionStack.push(action)
        }
    }
}