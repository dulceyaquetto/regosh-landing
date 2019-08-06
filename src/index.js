import './stylus/main.styl'

import { ProjectList, Dialog } from './scripts/structs.js'

var dialog = new Dialog('.dialog--fullscreen')
var projectList = new ProjectList([
    { 
        'title': 'Micromanipulator',
        'subtitle': 'Projecto Legal',
        'description': 'Projecto Legal',
        'img_url': 'https://source.unsplash.com/random/200x200'
    },
    { 
        'title': 'HiperObjectos',
        'subtitle': 'Projecto Legal',
        'description': 'Projecto Legal',
        'img_url': 'https://source.unsplash.com/random/200x200'
    },
    { 
        'title': 'Micromanipulator',
        'subtitle': 'Projecto Legal',
        'description': 'Projecto Legal',
        'img_url': 'https://source.unsplash.com/random/200x200'
    },
    { 
        'title': 'Micromanipulator',
        'subtitle': 'Projecto Legal',
        'description': 'Projecto Legal',
        'img_url': 'https://source.unsplash.com/random/200x200'
    },
    { 
        'title': 'Micromanipulator',
        'subtitle': 'Projecto Legal',
        'description': 'Projecto Legal',
        'img_url': 'https://source.unsplash.com/random/200x200'
    }
], '.item-grid')
