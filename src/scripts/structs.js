
export class ProjectList {
    constructor(rawData, selector) {
        this.el = null
        this.projects = []

        this.el = document.querySelector(selector)
        this.projects = rawData.map(rawProjectData => {
            const projectElem = document.createElement('div')
            const imgElem = document.createElement('img')
            imgElem.src = rawProjectData.img_url
            
            projectElem.classList.add('item')
            projectElem.setAttribute('data-after', rawProjectData.title)
            projectElem.appendChild(imgElem)

            this.el.appendChild(projectElem)
            return new Project(rawProjectData, projectElem)
        })
    }
}

export class Project {
    constructor(_data, el) {        
        this.data = _data || {}
        this.el = el || null

        this.initEvents()
    }

    initEvents() {
        this.el.addEventListener('click', (e) => {
            const dialog = getDialog()
            if (dialog) dialog.open(this.data)
        })
    }
}

export class Dialog {
    constructor(selector = undefined) {
        this.el = document.querySelector(selector)
        this.initEvents()
    }

    close() {
        this.el.classList.remove('show')
    }

    open(data = null) {
        if (data !== null) {
            this.el.querySelector('.dialog--title').innerHtml = data.title
            this.el.querySelector('.dialog--subtitle').innerHtml = data.subtitle
            this.el.querySelector('.dialog--paragraph').innerHtml = data.description
        }
        this.el.classList.add('show')
    }

    initEvents() {
        const backElem = this.el.querySelector('.dialog--back')
        backElem.addEventListener('click', (e) => {
            this.close()
        })
    }
}

function getDialog() {
    return new Dialog('.dialog--fullscreen')
}
