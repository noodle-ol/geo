import './css/main.css'
import PointElem from './elements/PointElem'
import LineElem from './elements/LineElem'
import SVGElem from './elements/SVGElem'
import Elem from './elements/IElem'
import PointElems from './elements/PointElems'
import LabelElems from './elements/LabelElems'
import CircleElem from './elements/CircleElem'

const unchoosePointElem = (pointElem: Nullable<SVGElement>) => {
    if (pointElem != null) {
        const baseR: Nullable<string> = pointElem.getAttribute("baseR")
        if (baseR == null) {
            return
        }

        pointElem.setAttribute("r", baseR)
    }
}

const togglePointElem = (selectedPointElem: Nullable<PointElem>, pointElem: Nullable<PointElem>) => {
    if (pointElem == null) {
        if (selectedPointElem != null) {
            selectedPointElem.unchoose()
            selectedPointElem = null
        }
    } else {
        if (selectedPointElem != null && (pointElem.getX() != selectedPointElem.getX() || pointElem.getY() != selectedPointElem.getY())) {
            selectedPointElem.unchoose()
        }

        selectedPointElem = pointElem
        selectedPointElem.choose()
    }

    return selectedPointElem
}

window.onload = (_e) => {
    const mouseBut: Nullable<HTMLElement> = document.getElementById("mouse")
    const pointBut: Nullable<HTMLElement> = document.getElementById("point")
    const lineBut: Nullable<HTMLElement> = document.getElementById("line")
    const circleBut: Nullable<HTMLElement> = document.getElementById("circle")
    const buts: Nullable<HTMLElement>[] = [mouseBut, pointBut, lineBut, circleBut]
    let selectedPointElem: Nullable<PointElem> = null

    let chooseBut: Nullable<HTMLElement> = mouseBut
    for (const but of buts) {
        if (but == null) {
            continue
        }

        but.onclick = (_e) => {
            if (!but.classList.contains("choose")) {
                if (chooseBut == null) {
                    return
                }

                chooseBut.classList.remove("choose")
                chooseBut = but
                chooseBut.classList.add("choose")
                selectedPointElem = togglePointElem(selectedPointElem, null)
            }
        }
    }

    const mainElem: Nullable<HTMLElement> = document.getElementById("main")
    if (mainElem == null) {
        return
    }

    const mainElemLeftMargin = mainElem.getBoundingClientRect()["x"]

    const svgElem = new SVGElem(mainElem.offsetWidth, mainElem.offsetHeight)
    mainElem.appendChild(svgElem.getElem())

    window.onresize = (_e) => {
        svgElem.setWidth(mainElem.offsetWidth)
        svgElem.setHeight(mainElem.offsetHeight)
    }

    const elemQueue: Elem[] = []
    const pointElems: PointElems = new PointElems()
    const labelElems: LabelElems = new LabelElems()

    const mouseClickMain = (e: MouseEvent) => {
        const [clientX, clientY] = [e.clientX - mainElemLeftMargin, e.clientY]
        let pointElem = pointElems.find(clientX, clientY)
        selectedPointElem = togglePointElem(selectedPointElem, pointElem)
    }

    const pointClickMain = (e: MouseEvent) => {
        const [clientX, clientY] = [e.clientX - mainElemLeftMargin, e.clientY]
        let pointElem = pointElems.find(clientX, clientY)

        if (pointElem == null) {
            const pointElem = new PointElem(clientX, clientY)

            svgElem.appendChild(pointElem)
            pointElems.push(pointElem)
            elemQueue.push(pointElem)

            const labelElem = labelElems.createLabel(pointElem)
            labelElem.onclick((p) => {
                selectedPointElem = togglePointElem(selectedPointElem, p)
            })
            svgElem.appendChild(labelElem)

            selectedPointElem?.unchoose()
        } else {
            selectedPointElem = togglePointElem(selectedPointElem, pointElem)
        }

    }

    const lineClickMain = (e: MouseEvent) => {
        const [clientX, clientY] = [e.clientX - mainElemLeftMargin, e.clientY]
        let pointElem = pointElems.find(clientX, clientY)
        if (selectedPointElem == null) {
            if (pointElem == null) {
                pointElem = new PointElem(clientX, clientY)

                svgElem.appendChild(pointElem)
                pointElems.push(pointElem)
                elemQueue.push(pointElem)

                const labelElem = labelElems.createLabel(pointElem)
                labelElem.onclick((p) => {
                    selectedPointElem = togglePointElem(selectedPointElem, p)
                })
                svgElem.appendChild(labelElem)

                unchoosePointElem(selectedPointElem)
            }

            selectedPointElem = togglePointElem(selectedPointElem, pointElem)
        } else {
            if (pointElem == null) {
                pointElem = new PointElem(clientX, clientY)

                svgElem.appendChild(pointElem)
                pointElems.push(pointElem)
                elemQueue.push(pointElem)

                const labelElem = labelElems.createLabel(pointElem)
                labelElem.onclick((p) => {
                    selectedPointElem = togglePointElem(selectedPointElem, p)
                })
                svgElem.appendChild(labelElem)
            }

            const lineElem = new LineElem(selectedPointElem, pointElem)
            svgElem.appendChild(lineElem)

            selectedPointElem = togglePointElem(selectedPointElem, null)
        }
    }

    const circleClickMain = (e: MouseEvent) => {
        const [clientX, clientY] = [e.clientX - mainElemLeftMargin, e.clientY]
        let pointElem = pointElems.find(clientX, clientY)
        if (selectedPointElem == null) {
            if (pointElem == null) {
                pointElem = new PointElem(clientX, clientY)

                svgElem.appendChild(pointElem)
                pointElems.push(pointElem)
                elemQueue.push(pointElem)

                const labelElem = labelElems.createLabel(pointElem)
                labelElem.onclick((p) => {
                    selectedPointElem = togglePointElem(selectedPointElem, p)
                })
                svgElem.appendChild(labelElem)

                unchoosePointElem(selectedPointElem)
            }

            selectedPointElem = togglePointElem(selectedPointElem, pointElem)
        } else {
            if (pointElem == null) {
                pointElem = new PointElem(clientX, clientY)

                svgElem.appendChild(pointElem)
                pointElems.push(pointElem)
                elemQueue.push(pointElem)

                const labelElem = labelElems.createLabel(pointElem)
                labelElem.onclick((p) => {
                    selectedPointElem = togglePointElem(selectedPointElem, p)
                })
                svgElem.appendChild(labelElem)
            }

            const circleElem = new CircleElem(selectedPointElem, pointElem)
            svgElem.appendChild(circleElem)

            selectedPointElem = togglePointElem(selectedPointElem, null)
        }
    }

    const mouseMoveMain = (e: MouseEvent) => {
        const [clientX, clientY] = [e.clientX - mainElemLeftMargin, e.clientY]
        if (selectedPointElem != null) {
            selectedPointElem.move(clientX, clientY)
        }

        labelElems.ondrag(clientX, clientY)
    }

    const pointMoveMain = (e: MouseEvent) => {
        const [clientX, clientY] = [e.clientX - mainElemLeftMargin, e.clientY]
        if (selectedPointElem != null) {
            selectedPointElem.move(clientX, clientY)
        }

        labelElems.ondrag(clientX, clientY)
    }

    let isDrag = false

    mainElem.onmousedown = (e) => {
        isDrag = true
        if (chooseBut == null) {
            return
        }

        const id = chooseBut.getAttribute("id")
        switch(id) {
            case "mouse": 
                mouseClickMain(e)
                break
            
            case "point":
                pointClickMain(e)
                break

            case "line":
                lineClickMain(e)
                break

            case "circle":
                circleClickMain(e)
                break
            
            default:
                break
        }
    }

    mainElem.onmousemove = (e) => {
        if (isDrag) {
            if (chooseBut == null) {
                return
            }

            const id = chooseBut.getAttribute("id")
            switch(id) {
                case "mouse": 
                    mouseMoveMain(e)
                    break
                
                case "point":
                    pointMoveMain(e)
                    break

                default:
                    break
            }
        }
    }

    mainElem.onmouseup = (_e) => {
        isDrag = false
    }

    document.onkeydown = (e) => {
        if (e.ctrlKey) {
            elemQueue.pop()?.remove()
        }
    }
}