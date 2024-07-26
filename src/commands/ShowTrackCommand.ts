import BaseElem from "../elements/BaseElem"
import Elem from "../elements/IElem"
import BaseCommand from "./BaseCommand"
import Commands from "./Commands"

export default class ShowTrackCommand extends BaseCommand {
    static instance: ShowTrackCommand

    private constructor() {
        super()
    }

    public static getInstance(): ShowTrackCommand {
        if (!ShowTrackCommand.instance) {
            ShowTrackCommand.instance = new ShowTrackCommand()
            Commands.instance.set("showTrack", ShowTrackCommand.instance)
        }

        return ShowTrackCommand.instance
    }

    public execute(p: (Elem | string | number)[]) {
        if (p.length == 1 && p[0] instanceof BaseElem) {
            p[0].showTrack()
        }
    }
}