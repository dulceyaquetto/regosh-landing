import './stylus/main.styl'

import data from './data.json'
import { ProjectList, Dialog, MemberList, ShareList } from './scripts/structs.js'
import { randomizeLetters, TextEffect } from './scripts/effects.js'
import TweenMax from './scripts/TweenMax.min.js'


var projectDialog = new Dialog('.dialog--fullscreen')
var projectList = new ProjectList([
    ...data.projects
], '.item-grid')

var memberList = new MemberList(data.members || [], '.section.team')

new ShareList(data.shares || [], '.section.share')

const titleEl = new TextEffect('#front-title')
setTimeout(() => {
    titleEl.animate()
}, 1000)


const blockSize = window.innerWidth < 700
    ? (window.innerHeight / 2)
    : (window.innerHeight / 3)
// (screen.height / 3)
const draftEl = document.querySelector('.main-section-img')
let widthInTrack = 0
let indexInTrack = 0
const projectsLength = data.projects.length
let projectsIndex = 0

const tracksElems = []
let heightBlocks = 0
while((heightBlocks + blockSize) <= screen.height) {
    const trackDiv = document.createElement('div')
    trackDiv.classList.add('track-squares')
    tracksElems.push(trackDiv)
    heightBlocks += blockSize
}

tracksElems.map(el => {
    draftEl.appendChild(el)
})

function getRandomIndex(min, max) {
    const offsetMax = max - min
    return Math.floor((Math.random() * offsetMax) + min)
}

function createProjSquareDiv(projects, index, indexInTrack, classList=[]) {
    let proj = projects[index]
    const projSquareDiv = document.createElement('div')
    {
        projSquareDiv.setAttribute('track-index', indexInTrack)
        projSquareDiv.classList.add('square', 'proj', ...classList)
        const imgEl = new Image()
        imgEl.src = proj.img_url    
        projSquareDiv.appendChild(imgEl)
    }
    return projSquareDiv
}

function createEmptySquareDiv(classList=[]) {
    const emptySquareDiv = document.createElement('div')
    emptySquareDiv.classList.add('square', 'empty', ...classList)
    return emptySquareDiv
}

while(widthInTrack < window.innerWidth) {
    tracksElems.forEach((track, i) => {
        let index = getRandomIndex(0, data.projects.length)
        const emptySquare = createEmptySquareDiv(i % 2 === 1 ? ['inverse'] : ['normal'])
        const square = createProjSquareDiv(
            data.projects,
            index,
            indexInTrack,
            i % 2 === 1 ? ['inverse'] : ['normal'])

        if(Math.random() > 0.50) {
            // 70% prob
            track.appendChild(square)
        } else {
            // track.appendChild(emptySquare)
        }
    })

    widthInTrack += blockSize
    indexInTrack++
    projectsIndex++
    if (projectsIndex >= projectsLength) {
        projectsIndex = 0
    }
}

tracksElems.forEach(trackEl => {
    trackEl.style.height = `${blockSize}px`
    trackEl.style.left = `-${blockSize}px`
})

TweenMax.set('.square', {
    x: function(i, t) {
        const j = parseInt(t.getAttribute('track-index'))
        return j * blockSize;
    },
    height: blockSize,
    width: blockSize
})

const factor = 0.078125
const speed = window.innerWidth * factor

TweenMax.to('.square.normal', speed, {
    ease: Linear.easeNone,
    x: `+=${window.innerWidth}`,
    // y: 200,
    // opacity: 1
    repeat: -1,
    modifiers: {
      x: function(x) {
        return x % (window.innerWidth + blockSize);
      }
    }
});

TweenMax.to('.square.inverse', speed, {
    ease: Linear.easeNone,
    x: `-=${window.innerWidth}`,
    // y: 200,
    // opacity: 1
    repeat: -1,
    modifiers: {
      x: function(x) {
        return x % (window.innerWidth + blockSize);
      }
    }
});
