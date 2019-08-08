import './stylus/main.styl'

import data from './data.json'
import { ProjectList, Dialog, MemberList, ShareList } from './scripts/structs.js'
import { randomizeLetters, TextEffect } from './scripts/effects.js'

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