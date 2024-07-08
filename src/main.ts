import './css/main.css'
import SVGElem from './elements/SVGElem'
import PointElems from './elements/PointElems'
import { commandStartup, execute } from './commandHelper'
import Elems from './elements/Elems'
import Commands from './commands/Commands'

window.onload = (_e) => {
    globalThis.nextId = 1
    globalThis.nextLabelChar = "A"
    globalThis.nextLabelNum = 0

    const commandElem: Nullable<HTMLInputElement> = <Nullable<HTMLInputElement>>document.getElementById("command")

    const mainElem: Nullable<HTMLElement> = document.getElementById("main")
    if (mainElem == null) {
        return
    }

    const mainElemLeftMargin = mainElem.getBoundingClientRect()["x"]

    globalThis.mainLeftMargin = mainElemLeftMargin

    const svgElem = new SVGElem(mainElem.offsetWidth, mainElem.offsetHeight)
    mainElem.appendChild(svgElem.getElem())

    window.onresize = (_e) => {
        svgElem.setWidth(mainElem.offsetWidth)
        svgElem.setHeight(mainElem.offsetHeight)
    }

    Elems.getInstance(svgElem.getElem())
    PointElems.getInstance()

    commandStartup()

    mainElem.onmousedown = (e) => {
        Commands.instance.getCurrentCommand().onmousedown(e)

    }

    mainElem.onmousemove = (e) => {
        globalThis.mouseX = e.clientX - globalThis.mainLeftMargin
        globalThis.mouseY = e.clientY

        Commands.instance.getCurrentCommand().onmousemove(e)
    }

    mainElem.onmouseup = (e) => {
        Commands.instance.getCurrentCommand().onmouseup(e)
    }

    // document.onkeydown = (e) => {
    //     if (e.ctrlKey) {
    //         elemQueue.pop()?.remove()
    //         return
    //     } 
    // }

    document.onkeyup = (e) => {
        if (e.key == "/") {
            commandElem?.classList.remove("hide")
            commandElem?.focus()

            Commands.instance.getCurrentCommand().onleave()
            Elems.instance.unselect()
            Commands.instance.setDefaultCommand()
        }
    }

    if (commandElem != null) {
        commandElem.onblur = (_e) => {
            commandElem.classList.add("hide")
            commandElem.value = ""
        }

        commandElem.onkeyup = (e) => {
            if (e.key == "Enter") {
                execute(commandElem.value)
                commandElem.classList.add("hide")
                commandElem.value = ""
            }
        }
    }
}