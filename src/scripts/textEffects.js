import TweenMax from './TweenMax.min.js'
import charming from './charming.min.js'

export function getMousePos (e) {
    let posx = 0;
    let posy = 0;
    if (!e) e = window.event;
    if (e.pageX || e.pageY) 	{
        posx = e.pageX;
        posy = e.pageY;
    }
    else if (e.clientX || e.clientY) 	{
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return { x : posx, y : posy }
}

export const mousemoveFn = ev => requestAnimationFrame(() => {
    // Tilt the current slide.
    tilt(ev);
});

export function tilt(ev) {
    const mousepos = getMousePos(ev);
    // Document scrolls.
    const docScrolls = {
        left : document.body.scrollLeft + document.documentElement.scrollLeft, 
        top : document.body.scrollTop + document.documentElement.scrollTop
    };
    const bounds = this.DOM.imgWrap.getBoundingClientRect();;
    // Mouse position relative to the main element (this.DOM.el).
    const relmousepos = { 
        x : mousepos.x - bounds.left - docScrolls.left, 
        y : mousepos.y - bounds.top - docScrolls.top 
    };
    
    // Move the element from -20 to 20 pixels in both x and y axis.
    // Rotate the element from -15 to 15 degrees in both x and y axis.
    let t = {x:[-20,20],y:[-20,20]},
        r = {x:[-15,15],y:[-15,15]};

    const transforms = {
        translation : {
            x: (t.x[1]-t.x[0])/bounds.width*relmousepos.x + t.x[0],
            y: (t.y[1]-t.y[0])/bounds.height*relmousepos.y + t.y[0]
        },
        rotation : {
            x: (r.x[1]-r.x[0])/bounds.height*relmousepos.y + r.x[0],
            y: (r.y[1]-r.y[0])/bounds.width*relmousepos.x + r.y[0]
        }
    };

    // Move the image wrap.
    TweenMax.to(this.DOM.imgWrap, 1.5, {
        ease: 'Power1.easeOut',
        x: transforms.translation.x,
        y: transforms.translation.y,
        rotationX: transforms.rotation.x,
        rotationY: transforms.rotation.y
    }); 

    // Move the texts wrap.
    TweenMax.to(this.DOM.texts.wrap, 1.5, {
        ease: 'Power1.easeOut',
        x: -1*transforms.translation.x,
        y: -1*transforms.translation.y
    }); 
}



// Gets a random integer.
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
// Equation of a line (y = mx + b ).
const lineEq = (y2, y1, x2, x1, currentVal) => {
    const m = (y2 - y1) / (x2 - x1);
    const b = y1 - m * x1;
    return m * currentVal + b;
};


// Some random chars.
const chars = ['$','%','#','&','=','*','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','.',':',',','^'];
const charsTotal = chars.length;

export class TextEffect {
    constructor(selector) {
        this.el = document.querySelector(selector)
        charming(this.el)
        this.letters = Array.from(this.el.querySelectorAll('span')).sort(() => 0.5 - Math.random())
        this.letters.forEach(letter => letter.dataset.initial = letter.innerHTML);
    }
    animate(loop = true) {
        randomizeLetters(this.letters)
        if (loop) {
            setInterval(() => {
                randomizeLetters(this.letters)
            }, 2000);    
        }
    }
}

// Randomize letters function. Used when navigating the slideshow to switch the curretn slide´s texts.
export const randomizeLetters = (letters) => {
    return new Promise((resolve, reject) => {
        const lettersTotal = letters.length;
        let cnt = 0;

        letters.forEach((letter, pos) => { 
            let loopTimeout;
            const loop = () => {
                letter.innerHTML = chars[getRandomInt(0,charsTotal-1)];
                loopTimeout = setTimeout(loop, getRandomInt(50,500));
            };
            loop();

            const timeout = setTimeout(() => {
                clearTimeout(loopTimeout);
                letter.style.opacity = 1;
                letter.innerHTML = letter.dataset.initial;
                ++cnt;
                if ( cnt === lettersTotal ) {
                    resolve();
                }
            }, pos*lineEq(40,0,8,200,lettersTotal));
        });
    });
};

