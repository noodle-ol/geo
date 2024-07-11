import './css/main.css'
import SVGElem from './elements/SVGElem'
import PointElems from './elements/PointElems'
import { commandStartup, execute } from './commandHelper'
import Elems from './elements/Elems'
import Commands from './commands/Commands'
import { shortcut } from './shortcutHelper'
import CurveElems from './elements/CurveElems'
import Actions from './actions/Actions'
import { getCoorByMouseEvent } from './coorHelper'

window.onload = (_e) => {
    globalThis.nextId = 1
    globalThis.nextPointLabelChar = "A"
    globalThis.nextPointLabelNum = 0
    globalThis.nextCurveLabelChar = "a"
    globalThis.nextCurveLabelNum = 0
    globalThis.unusedPointLabels = []
    globalThis.unusedCurveLabels = []
    globalThis.coorCenterX = 0
    globalThis.coorCenterY = 0

    const actions: Actions = Actions.getInstance()

    const mainElem: Nullable<HTMLElement> = document.getElementById("main")
    if (mainElem == null) {
        return
    }

    globalThis.mainLeftMargin = mainElem.getBoundingClientRect()["x"]

    const svgElem = new SVGElem(mainElem.offsetWidth, mainElem.offsetHeight)
    mainElem.appendChild(svgElem.getElem())

    window.onresize = (_e) => {
        svgElem.setWidth(mainElem.offsetWidth)
        svgElem.setHeight(mainElem.offsetHeight)
    }

    Elems.getInstance(svgElem.getElem())
    PointElems.getInstance()
    CurveElems.getInstance()

    commandStartup()

    mainElem.onmousedown = (e) => {
        globalThis.currentShortcut = ""
        Commands.instance.getCurrentCommand().onmousedown(e)
    }

    mainElem.onmousemove = (e) => {
        const [relativeMouseX, relativeMouseY] = getCoorByMouseEvent(e)
        globalThis.mouseX = relativeMouseX
        globalThis.mouseY = relativeMouseY

        Commands.instance.getCurrentCommand().onmousemove(e)
    }

    mainElem.onmouseup = (e) => {
        Commands.instance.getCurrentCommand().onmouseup(e)
    }

    document.onkeydown = (e) => {
        if (e.ctrlKey && e.key == 'z') {
            actions.reverse()
        } else if (e.ctrlKey && e.key == 'y') {
            actions.backward()
        }
    }

    document.onkeyup = (e) => {
        if (e.key == "/") {
            commandElem?.classList.remove("hide")
            commandElem?.focus()

            Commands.instance.getCurrentCommand().onleave()
            Elems.instance.unselect()
            Commands.instance.setDefaultCommand()
        } else if (e.key == "g") {
            globalThis.currentShortcut = "g"
        } else {
            const command = shortcut.get(globalThis.currentShortcut + e.key)
            if (command != null) {
                const commandOb = Commands.instance.get(command)
                if (commandOb != null) {
                    globalThis.currentShortcut = ""
                    Commands.instance.getCurrentCommand().onleave()
                    Elems.instance.unselect()
                    Commands.instance.setCurrentCommand(commandOb)
                }
            }
        }
    }

    const commandElem: Nullable<HTMLInputElement> = <Nullable<HTMLInputElement>>document.getElementById("command")
    if (commandElem != null) {
        commandElem.onblur = (_e) => {
            commandElem.classList.add("hide")
            commandElem.value = ""
        }

        commandElem.onkeyup = (e) => {
            e.stopPropagation()
            if (e.key == "Enter") {
                execute(commandElem.value)
                commandElem.classList.add("hide")
                commandElem.value = ""
            } else if (e.key == "Escape") {
                commandElem.classList.add("hide")
                commandElem.value = ""
            }
        }
    }

    window.onbeforeunload = () => {
        return
    }
}