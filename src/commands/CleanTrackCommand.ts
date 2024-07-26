import Elem from "../elements/IElem"
import BaseCommand from "./BaseCommand"
import Commands from "./Commands"

export default class CleanTrackCommand extends BaseCommand {
    static instance: CleanTrackCommand

    private constructor() {
        super()
    }

    public static getInstance(): CleanTrackCommand {
        if (!CleanTrackCommand.instance) {
            CleanTrackCommand.instance = new CleanTrackCommand()
            Commands.instance.set("cleanTrack", CleanTrackCommand.instance)
        }

        return CleanTrackCommand.instance
    }

    public execute(p: (Elem | string | number)[]) {
        if (p.length == 0) {
            document.querySelectorAll(".track").forEach(el => el.remove())
        }
    }
}