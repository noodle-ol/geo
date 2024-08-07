import ChangeCurveStyleCommand from "../commands/ChangeCurveStyleCommand"
import ChangeLabelCommand from "../commands/ChangeLabelCommand"
import ChangeLabelStyleCommand from "../commands/ChangeLabelStyleCommand"
import ChangePointStyleCommand from "../commands/ChangePointStyleCommand"
import CircleCommand from "../commands/CircleCommand"
import Commands from "../commands/Commands"
import FullscreenCommand from "../commands/FullscreenCommand"
import HideCommand from "../commands/HideCommand"
import HideLabelCommand from "../commands/HideLabelCommand"
import UnshowTrackCommand from "../commands/UnshowTrackCommand"
import LineCommand from "../commands/LineCommand"
import LockCommand from "../commands/LockCommand"
import MouseCommand from "../commands/MouseCommand"
import PointCommand from "../commands/PointCommand"
import RemoveCommand from "../commands/RemoveCommand"
import ShowCommand from "../commands/ShowCommand"
import ShowLabelCommand from "../commands/ShowLabelCommand"
import ShowTrackCommand from "../commands/ShowTrackCommand"
import UnlockCommand from "../commands/UnlockCommand"
import Elems from "../elements/Elems"
import CleanTrackCommand from "../commands/CleanTrackCommand"

export const commandStartup = () => {
    Commands.getInstance()
    MouseCommand.getInstance()
    PointCommand.getInstance()
    LineCommand.getInstance()
    CircleCommand.getInstance()
    HideCommand.getInstance()
    ShowCommand.getInstance()
    FullscreenCommand.getInstance()
    RemoveCommand.getInstance()
    HideLabelCommand.getInstance()
    ShowLabelCommand.getInstance()
    ChangeLabelCommand.getInstance()
    ChangePointStyleCommand.getInstance()
    ChangeCurveStyleCommand.getInstance()
    ChangeLabelStyleCommand.getInstance()
    LockCommand.getInstance()
    UnlockCommand.getInstance()
    ShowTrackCommand.getInstance()
    UnshowTrackCommand.getInstance()
    CleanTrackCommand.getInstance()

    Commands.instance.setCurrentCommand(MouseCommand.instance)
}

export const execute = (command: string) => {
    const firstSpit = command.trim().split("(")

    if (firstSpit.length != 2) {
        return
    }

    const commandName = firstSpit[0].trim()

    const secondSpit = firstSpit[1].slice(0, -1).trim().split(",").map((e: string) => e.trim()).map((e: string) => {
        if (e == '') {
            return null
        } if ((e[0] == `'` && e[e.length - 1] == `'`) || (e[0] == `"` && e[e.length - 1] == `"`)) {
            return e.slice(1, -1)
        } else if (!isNaN(parseFloat(e))) {
            return Number(e)
        } else {
            const elem = Elems.instance.getByLabel(e)
            if (elem != null) {
                return elem
            }

            return e
        }
    }).filter((e) => e != null)

    const c =  Commands.instance.get(commandName)
    if (c == null) {
        return
    }

    c.execute(secondSpit)
}