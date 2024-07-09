import CircleCommand from "./commands/CircleCommand"
import Commands from "./commands/Commands"
import FullscreenCommand from "./commands/FullscreenCommand"
import HideCommand from "./commands/HideCommand"
import LineCommand from "./commands/LineCommand"
import MouseCommand from "./commands/MouseCommand"
import PointCommand from "./commands/PointCommand"
import ShowCommand from "./commands/ShowCommand"
import Elems from "./elements/Elems"

export const commandStartup = () => {
    Commands.getInstance()
    MouseCommand.getInstance()
    PointCommand.getInstance()
    LineCommand.getInstance()
    CircleCommand.getInstance()
    HideCommand.getInstance()
    ShowCommand.getInstance()
    FullscreenCommand.getInstance()

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