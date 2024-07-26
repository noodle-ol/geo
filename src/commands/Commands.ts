import Command from "./ICommand"
import MouseCommand from "./MouseCommand"

export default class Commands {
    static instance: Commands
    private map: Map<string, Command>
    private currentCommand: Command
    private commandNames: string[]

    private constructor() {
        this.map = new Map<string, Command>()
        this.currentCommand = MouseCommand.instance
        this.commandNames = []
    }

    public static getInstance(): Commands {
        if (!Commands.instance) {
            Commands.instance = new Commands()
        }

        return Commands.instance
    }

    public set(name: string, command: Command) {
        this.map.set(name, command)
        this.commandNames.push(name)
    }

    public get(name: string): Nullable<Command> {
        const command = this.map.get(name)
        if (!command) {
            return null
        }

        return command
    }

    public getCurrentCommand(): Command {
        return this.currentCommand
    }

    public setDefaultCommand() {
        this.currentCommand = MouseCommand.instance
    }

    public setCurrentCommand(command: Command) {
        this.currentCommand = command
    }

    public search(text: string): string[] {
        return this.commandNames.filter((command: string): boolean => command.includes(text))
    }
}