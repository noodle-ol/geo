import { execute } from "../../helpers/commandHelper"
import SearchCommandElem from "./SearchCommandElem"

export default class CommandElem {
    static instance: CommandElem
    private isShow: boolean
    private elem: Nullable<HTMLInputElement>

    private constructor() {
        this.isShow = false
        this.elem = <Nullable<HTMLInputElement>>document.getElementById("command")

        SearchCommandElem.getInstance()

        if (this.elem != null) {
            this.elem.onblur = (_e) => {
                this.hide()
            }

            this.elem.onkeydown = (e) => {
                e.stopPropagation()
                if (e.key == "Enter") {
                    execute(this.getValue())
                    this.hide()
                } else if (e.key == "Escape") {
                    this.hide()
                } else if (e.key == "Tab") {
                    e.preventDefault()
                    const result = SearchCommandElem.instance.tab()

                    if (result != null) {
                        if (this.elem != null) {
                            this.elem.value = result
                        }
                    }
                } else if (e.key == "ArrowUp") {
                    SearchCommandElem.instance.moveUp()
                } else if (e.key == "ArrowDown") {
                    SearchCommandElem.instance.moveDown()
                }
            }

            this.elem.oninput = (_e) => {
                SearchCommandElem.instance.show()
                SearchCommandElem.instance.setText(this.getValue())
            }
        }
    }

    public static getInstance(): CommandElem {
        if (!CommandElem.instance) {
            CommandElem.instance = new CommandElem()
        }

        return CommandElem.instance
    }

    public focus() {
        if (this.elem != null) {
            this.elem.focus()
        }
    }

    public show() {
        if (!this.isShow) {
            this.isShow = true
            if (this.elem != null) {
                this.elem.classList.remove("hide")
            }
        }
    }

    public hide() {
        if (this.isShow) {
            this.isShow = false
            if (this.elem != null) {
                this.elem.classList.add("hide")
                this.elem.value = ""
            }

            SearchCommandElem.instance.hide()
        }
    } 

    private getValue(): string {
        if (this.elem != null) {
            return this.elem.value
        }

        return ""
    }

    public setValue(text: string) {
        if (this.elem != null) {
            this.elem.value = text
        }
    }
}