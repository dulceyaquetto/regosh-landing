import TweenMax from './TweenMax.min.js'

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
            const projectDialog = getDialog()
            if (projectDialog) projectDialog.open(this.data, e)
        })
    }
}

export class Dialog {
    constructor(selector = undefined) {
        this.el = document.querySelector(selector)
        this.initEvents()

        this.closeDuration = .2
        this.closeDurationMillis = this.closeDuration * 1000

        this.openDuration = .4
        this.openDurationMillis = this.openDuration * 1000

        this.transforms = {
            translation : {
                x: 0,
                y: 0
            },
            // rotation : {
            //     x: 5,
            //     y: 4
            // }
        }
    }

    close() {
        this.el.classList.remove('show')
    }

    open(data = null, ev) {
        if (data !== null) {
            const dialogBackEl = this.el.querySelector('.dialog--back')
            const dialogTitleEl = this.el.querySelector('.dialog--title')
            const dialogSubtitleEl = this.el.querySelector('.dialog--subtitle')
            const dialogParagraphEl = this.el.querySelector('.dialog--paragraph')
            dialogTitleEl.innerHTML = data.title
            dialogSubtitleEl.innerHTML = data.subtitle
            dialogParagraphEl.innerHTML = data.description
            // const imageUrl = require(`${data.portrait_img_url}`)
            // this.el.querySelector('#project-img-dialog').src = imageUrl
            if (this.el.querySelector('.dialog--img') !== null) {
                this.el.querySelector('.dialog--img').remove()
            }
            var myImage = new Image()
            myImage.id = 'project-img-dialog'
            myImage.src = data.portrait_img_url
            const divImage = document.createElement('div')
            divImage.classList.add('dialog--img')
            divImage.appendChild(myImage)
            
            this.el.appendChild(divImage)
            this.el.classList.add('show')
            this.animateOpen(
                [dialogTitleEl, dialogSubtitleEl, dialogParagraphEl, dialogBackEl],
                myImage,
                ev)
        }
    }

    animationClose() {
        const duration = this.closeDuration
        const durationMillis = this.closeDurationMillis
        
        TweenMax.set(this.el, {opacity: 1})
        TweenMax.to(this.el, duration, {opacity: 0});
        setTimeout(() => {
            this.close()
        }, durationMillis);
    }

    animateOpen(elems, imageEl) {
        const duration = this.openDuration
        TweenMax.to(this.el, duration, {opacity: 1})
        
        TweenMax.set(imageEl, {
            scale: .3,
        })
        TweenMax.to(imageEl, duration, {
            scale: 1,
        })

        
        elems.forEach(elem => {
            // Move the texts wrap.
            TweenMax.set(elem, {
                opacity: 0,
                x: 0,
                y: 5
            })
            TweenMax.to(elem, duration * 2, {
                // ease: 'Power1.easeOut',
                x: -1*this.transforms.translation.x,
                y: -1*this.transforms.translation.y,
                opacity: 1
            }); 
            // TweenMax.to(elem, .6, {
            //     // ease: Elastic.easeOut.config(1,0.5),
            //     // startAt: {x: '-10%', opacity: 0},
            //     // x: '0%',
            //     ease: Power4.easeInOut,
            //     scale: 1 
            // });                
        });
        // this.el.classList.add('dialog-opened-anim')
    }

    initEvents() {
        const backElem = this.el.querySelector('.dialog--back')
        backElem.addEventListener('click', (e) => {
            // this.close()
            this.animationClose()
        })
    }
}

export class MemberList {
    constructor(rawData, selector) {
        this.el = null
        this.members = {}

        const sectionTeamEl = document.querySelector(selector)
        const div = document.createElement('div')
        div.classList.add('team-members')

        sectionTeamEl.appendChild(div)
        
        this.el = div
        for(let residence in rawData) {
            const residenceDiv = document.createElement('div')
            residenceDiv.classList.add('residence')
            const residenceLabelDiv = document.createElement('div')
            residenceLabelDiv.classList.add('residence-label', 'text')
            residenceLabelDiv.innerHTML = residence
            const residenceItemsDiv = document.createElement('div')
            residenceItemsDiv.classList.add('residence-items')

            residenceDiv.appendChild(residenceLabelDiv)
            residenceDiv.appendChild(residenceItemsDiv)
            
            this.el.appendChild(residenceDiv)
            this.members[residence] = rawData[residence].map((rawMemberData, i) => {
                const memberElem = document.createElement('div')
                const imgElem = document.createElement('img')
                imgElem.src = rawMemberData.img_url
                
                memberElem.classList.add('member-item')
                // memberElem.setAttribute('data-after', rawMemberData.title)
                memberElem.appendChild(imgElem)
                residenceItemsDiv.appendChild(memberElem)
                const member = new Member(rawMemberData, memberElem)
                return member
            })
        }
    }
}

export class Member {
    constructor(data, elem) {
        this.data = data
        this.el = elem
        this.mobileDevice = window.innerWidth < 700
        this.leftMargin = this.mobileDevice ? 0 : (window.innerWidth - 700) / 2
        this.containerWidth = this.mobileDevice ? window.innerWidth : 700

        const miniDialog = document.createElement('div')
        this.dialogElem = miniDialog
        miniDialog.classList.add('mini-dialog')
        {
            const closeDiv = document.createElement('div')
            closeDiv.classList.add('mini-dialog--close')
            closeDiv.innerHTML = `<span>&times;</span>`
            this.dialogElem.appendChild(closeDiv)
            closeDiv.querySelector('span').addEventListener('click', (e) => {
                this.close()
            })
        }

        const elems = [
            { value: data.nickname, class: 'mini-dialog--title', type: 'text' },
            { value: data.description || '', class: 'mini-dialog--description', type: 'text' },
            { value: data.skills || '#GOSH', class: 'mini-dialog--skills', type: 'array' },
            { value: data.tags || '#GOSH', class: 'mini-dialog--tags', type: 'array' },
            { value: data.contact_list || '#GOSH', class: 'mini-dialog--contact-list', type: 'contact_list' },
            // ...(data.contactList.map(c => ({value: data. })))
        ].map(d => {
            const dialogElem = document.createElement('div')
            dialogElem.classList.add(d.class)
            if (d.type === 'array') {
                dialogElem.innerHTML = d.value.map(v => `<span>${v}</span>`)
            } else if (d.type === 'contact_list') {
                for (let i in data.contact_list) {
                    const contactItemData = data.contact_list[i]
                    const contactItem = document.createElement('div')
                    contactItem.classList.add('mini-dialog--contact-item')
                    if (contactItemData.type === 'email') {
                        contactItem.classList.add('email')
                    }
                    if (contactItemData.icon !== undefined) {
                        contactItem.innerHTML = `
                        <a target="_blank" href="${contactItemData.link}"><img src="${contactItemData.icon}" /></a>
                        `
                    } else {
                        contactItem.innerHTML = `
                        <a href="${contactItemData.link}">${contactItemData.value}</a>
                        `
                    }
                    dialogElem.appendChild(contactItem)                    
                }
            } else {
                dialogElem.innerHTML = d.value
            }
            return dialogElem
        })
        elems.forEach(_elem => {
            miniDialog.appendChild(_elem)
        })

        this.el.appendChild(miniDialog)
        this.el.addEventListener('mouseover', (e) => {
            // console.log('mouseover ev', e)
            miniDialog.style.display = 'inline-block'
            const factor = (e.clientX - this.leftMargin) / this.containerWidth
            // console.log('factor', factor)
            // console.log('containerWidth', this.containerWidth)
            // console.log('leftMargin', this.leftMargin)
            // console.log('e.clientX', e.clientX)
            if (this.mobileDevice) {
                if (factor <= 0.5) {
                    // left
                    miniDialog.style.left = `${-10}px`
                    miniDialog.style.right = undefined
                } else {
                    // > 0.5, right
                    miniDialog.style.left = undefined
                    miniDialog.style.right = `${0}px`
                }
            } else {
                if (factor <= 0.3) {
                    // left
                    miniDialog.style.left = `${0}px`
                    miniDialog.style.right = undefined
                } else if (factor > 0.3 && factor < 0.7) {
                    // middle
                    miniDialog.style.left = `-${(miniDialog.offsetWidth/2) - 50}px`
                    miniDialog.style.right = undefined
                } else {
                    // > 0.7, right
                    miniDialog.style.left = undefined
                    miniDialog.style.right = `${0}px`
                }    
            }
        })
        this.el.addEventListener('mouseout', (e) => {
            this.close()
        })
    }

    close() {
        this.dialogElem.style.display = 'none'
    }

    show() {
        this.dialogElem.style.display = 'inline-block'
    }
}

export class ShareList {
    constructor(shareRawData, selector) {
        const container = document.querySelector(selector)
        const div = document.createElement('div')
        div.classList.add('share-items-container')
        container.appendChild(div)
        this.el = div
        this.shares = shareRawData.map(shareData => {
            // this.el
            // share
            const shareItemEl = document.createElement('div')
            shareItemEl.classList.add('share-item')

            this.el.appendChild(shareItemEl)
            return new Share(shareData, shareItemEl)
        })
    }
}

export class Share {
    constructor(data, el) {
        this.data = data
        this.el = el

        const aEl = document.createElement('a')
        aEl.setAttribute('href', data.link)
        aEl.setAttribute('target', '_blank')
        const imgShare = new Image()
        imgShare.src = data.img_url
        aEl.appendChild(imgShare)
        this.el.appendChild(aEl)
    }
}

function getDialog() {
    return new Dialog('.dialog--fullscreen')
}
