import Elem from "../elements/IElem"
import Commands from "./Commands"
import Command from "./ICommand"

export default class FullscreenCommand implements Command {
    static instance: FullscreenCommand

    private constructor() {}

    public static getInstance(): FullscreenCommand {
        if (!FullscreenCommand.instance) {
            FullscreenCommand.instance = new FullscreenCommand()
            Commands.instance.set("fullscreen", FullscreenCommand.instance)
        }

        return FullscreenCommand.instance
    }

    public execute(_p: (Elem | string | number)[]) {
        if (!document.fullscreenElement) {
            const bodyElem: Nullable<HTMLElement> = document.getElementById("body")
            if (bodyElem == null) {
                return
            }

            bodyElem.requestFullscreen()
        }
    }

    public onmousedown(_e: MouseEvent) {}

    public onmousemove(_e: MouseEvent) {}

    public onmouseup(_e: MouseEvent) {}

    public onleave() {}
}