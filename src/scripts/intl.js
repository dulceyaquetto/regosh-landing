
const supportedLanguajes = [
    {
        'name': 'Español',
        'code': 'es',
        'suffix': '_es',
        'emoji': '🇪🇸',
        'image_url': 'assets//spain.png'
    },
    {
        'name': 'Portugues',
        'code': 'pr',
        'suffix': '_pr',
        'emoji': '🇧🇷',
        'image_url': 'assets//brazil.png'
    },
    {
        'name': 'English',
        'code': 'en',
        'suffix': '_en',
        'emoji': '🇺🇸',
        'image_url': 'assets//usa.png'
    }
]

let components = []
let staticElemsAddress = []
let staticStrings = {}

let selectedLanguaje = supportedLanguajes[0]

export function init() {
    
    selectedLanguaje = supportedLanguajes[0]
    const selectEl = document.querySelector('#select-lang')
    supportedLanguajes.map(lang => {
        const optionEl = document.createElement('option')
        optionEl.value = lang.code
        optionEl.innerHTML = `<span>${lang.code.toUpperCase()}&emsp;${lang.emoji}</span>`
        if (selectedLanguaje.code === lang.code) {
            optionEl.selected = 'selected'
        }
        selectEl.appendChild(optionEl)
    })

    selectEl.addEventListener('change', translateAll)
}

export function loadTranslatableComponents(elems = []) {
    components.push(...elems)
}
export function loadTranslatableElems(data, elemAddress = []) {
    staticStrings = data
    staticElemsAddress.push(...elemAddress)
}

function translateAll(ev) {
    const code = ev.target.value
    console.log('code', code)

    for(let i = 0; i < supportedLanguajes.length; i++) {
        let lang = supportedLanguajes[i]
        if (lang.code === code) {
            selectedLanguaje = lang
            break
        }
    }

    components.forEach(el => {
        el.translate()
    })

    staticElemsAddress.forEach(t => {
        const key = t.key.split('.')[1]
        
        document.querySelector(t.selector).innerHTML = tranlateString(staticStrings, key)
    })
}

export function translateStatics() {
    staticElemsAddress.forEach(t => {
        const key = t.key.split('.')[1]
        const elem = document.querySelector(t.selector)
        elem.innerHTML = tranlateString(staticStrings, key)
    })
}

function langSuffix() {
    return selectedLanguaje['suffix']
}

export function tranlateString(data, key) {
    // search for selected languaje
    let stringTranslated = data[`${key}${langSuffix()}`]
    if (stringTranslated !== undefined) {
        return stringTranslated
    }
    // if undefined select default
    stringTranslated = data[`${key}`]
    if (stringTranslated !== undefined) {
        return stringTranslated
    }
    // if not default select another one
    for(let i = 0; i < supportedLanguajes.length; i++) {
        let lang = supportedLanguajes[i]
        let word = data[`${key}${lang.suffix}`]
        if (word !== undefined) {
            return word
        }
    }
    // if nothing, empty
    return ''
}