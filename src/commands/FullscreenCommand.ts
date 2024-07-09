import Elem from "../elements/IElem"
import BaseCommand from "./BaseCommand"
import Commands from "./Commands"

export default class FullscreenCommand extends BaseCommand {
    static instance: FullscreenCommand

    private constructor() {
        super()
    }

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
}