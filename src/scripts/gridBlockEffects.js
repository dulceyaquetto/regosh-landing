

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

export function initGridBlockEffect(parentEl, data) {
    const blockSize = window.innerWidth < 700
    ? (window.innerHeight / 2)
    : (window.innerHeight / 3) // (screen.height / 3)

    let widthInTrack = 0
    let indexInTrack = 0
    let projectsIndex = 0
    const projectsLength = data.projects.length
    const factor = 0.078125
    const speed = window.innerWidth * factor

    const tracksElems = []

    let heightBlocks = 0
    while((heightBlocks + blockSize) <= screen.height) {
        const trackDiv = document.createElement('div')
        trackDiv.classList.add('track-squares')
        tracksElems.push(trackDiv)
        heightBlocks += blockSize
    }

    tracksElems.map(el => {
        parentEl.appendChild(el)
    })

    while(widthInTrack < window.innerWidth) {
        tracksElems.forEach((track, i) => {
            let index = getRandomIndex(0, data.projects.length)
            const square = createProjSquareDiv(
                data.projects,
                index,
                indexInTrack,
                i % 2 === 1 ? ['inverse'] : ['normal'])

            if(window.innerWidth < 700) {
                track.appendChild(square)
            } else if(Math.random() > 0.50) {
                // 50% prob
                track.appendChild(square)
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
        trackEl.style.width = `calc(100% + ${blockSize}px)`
    })

    TweenMax.set('.square', {
        x: function(i, t) {
            const j = parseInt(t.getAttribute('track-index'))
            return j * blockSize;                    
        },
        height: blockSize,
        width: blockSize
    })


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
    })

    function wrap(value, min, max) {
        var v = value - min;
        var r = max - min;
    
        return ((r + v % r) % r) + min;
    }

    TweenMax.to('.square.inverse', speed, {
        ease: Linear.easeNone,
        x: `-=${window.innerWidth}`,
        repeat: -1,
        modifiers: {
            x: function(x) {
                return wrap(x, 0, window.innerWidth + blockSize)
                // return x % (window.innerWidth + blockSize);
            }
        }
    })
}
