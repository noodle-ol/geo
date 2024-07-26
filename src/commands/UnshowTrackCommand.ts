import BaseElem from "../elements/BaseElem"
import Elem from "../elements/IElem"
import BaseCommand from "./BaseCommand"
import Commands from "./Commands"

export default class UnshowTrackCommand extends BaseCommand {
    static instance: UnshowTrackCommand

    private constructor() {
        super()
    }

    public static getInstance(): UnshowTrackCommand {
        if (!UnshowTrackCommand.instance) {
            UnshowTrackCommand.instance = new UnshowTrackCommand()
            Commands.instance.set("unshowTrack", UnshowTrackCommand.instance)
        }

        return UnshowTrackCommand.instance
    }

    public execute(p: (Elem | string | number)[]) {
        if (p.length == 1 && p[0] instanceof BaseElem) {
            p[0].unshowTrack()
        }
    }
}