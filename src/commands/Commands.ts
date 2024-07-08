import Command from "./ICommand"
import MouseCommand from "./MouseCommand"

export default class Commands {
    static instance: Commands
    private map: Map<string, Command>
    private currentCommand: Command

    private constructor() {
        this.map = new Map<string, Command>()
        this.currentCommand = MouseCommand.instance
    }

    public static getInstance(): Commands {
        if (!Commands.instance) {
            Commands.instance = new Commands()
        }

        return Commands.instance
    }

    public set(name: string, command: Command) {
        this.map.set(name, command)
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
}