import Commands from "../../commands/Commands"
import CommandElem from "./CommandElem"

export default class SearchCommandElem {
    static instance: SearchCommandElem
    private isshow: boolean
    private elem: Nullable<HTMLElement>
    private text: string
    private resultElems: HTMLElement[]
    private resultElemChooseIndex: number

    private constructor() {
        this.isshow = false
        this.elem = document.getElementById("search-command-box")
        this.text = ""
        this.resultElems = []
        this.resultElemChooseIndex = 0
    }

    public static getInstance(): SearchCommandElem {
        if (!SearchCommandElem.instance) {
            SearchCommandElem.instance = new SearchCommandElem()
        }

        return SearchCommandElem.instance
    }

    public show() {
        if (!this.isshow) {
            this.isshow = true
            if (this.elem != null) {
                this.elem.classList.remove("hide")
            }
        }
    }

    public hide() {
        if (this.isshow) {
            this.isshow = false
            if (this.elem != null) {
                this.elem.classList.add("hide")
                this.clean()
            }
        }
    }

    public clean() {
        if (this.elem != null) {
            this.elem.replaceChildren()
            this.text = ""
            this.resultElemChooseIndex = 0
        }
    }

    public search() {
        if (this.text == "") {
            this.hide()

            return 
        }

        const results = Commands.instance.search(this.text)
        const length = results.length < 5 ? results.length : 5
        if (this.elem != null) {
            this.elem.replaceChildren()
            this.resultElems = []
            for (let i = 0; i < length; i++) {
                const resultElem = document.createElement("div")
                resultElem.classList.add("search-result")
                resultElem.onmousedown = (e) => {
                    e.preventDefault()
                    this.choose(i)
                }
                resultElem.innerHTML = results[i]

                if (i == this.resultElemChooseIndex) {
                    resultElem.classList.add("search-result-choose")
                }

                this.elem.appendChild(resultElem)
                this.resultElems.push(resultElem)
            }
        }
    }

    public tab() {
        if (this.resultElems.length > 0) {
            CommandElem.instance.setValue(this.resultElems[this.resultElemChooseIndex].innerHTML)
            this.hide()
        }
    }

    public setText(text: string) {
        this.text = text
        this.search()
    }

    public moveUp() {
        this.resultElems[this.resultElemChooseIndex].classList.remove("search-result-choose")

        if (this.resultElemChooseIndex == 0) {
            this.resultElemChooseIndex = this.resultElems.length - 1
        } else {
            this.resultElemChooseIndex--
        }

        this.resultElems[this.resultElemChooseIndex].classList.add("search-result-choose")
    }

    public moveDown() {
        this.resultElems[this.resultElemChooseIndex].classList.remove("search-result-choose")

        if (this.resultElemChooseIndex == this.resultElems.length - 1) {
            this.resultElemChooseIndex = 0
        } else {
            this.resultElemChooseIndex++
        }

        this.resultElems[this.resultElemChooseIndex].classList.add("search-result-choose")
    }

    public choose(index: number) {
        if (index < this.resultElems.length) {
            CommandElem.instance.setValue(this.resultElems[index].innerHTML)
            this.hide()
        }
    }
}