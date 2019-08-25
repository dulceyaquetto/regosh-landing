import './stylus/main.styl'

import data from './data.json'
import { ProjectList, Dialog, MemberList, ShareList } from './scripts/structs.js'
import * as intl from  './scripts/intl.js'
import { randomizeLetters, TextEffect } from './scripts/textEffects.js'
import { initGridBlockEffect } from './scripts/gridBlockEffects'
import TweenMax from './scripts/TweenMax.min.js'

intl.init()

var projectDialog = new Dialog('.dialog--fullscreen')
var projectList = new ProjectList([
    ...data.projects
], '.item-grid')

var memberList = new MemberList(data.residences || [], '.section.team')

new ShareList(data.shares || [], '.section.share')

const titleEl = new TextEffect('#front-title')
setTimeout(() => {
    titleEl.animate()
}, 1000)

intl.loadTranslatableComponents([
    projectList,
    memberList
])

intl.loadTranslatableElems(data.landing, [
    { selector: '#front-phrase', key: 'landing.phrase' },
    { selector: 'body > div.header > ul > li:nth-child(1) > div > a', key: 'landing.nav_item_1' },
    { selector: 'body > div.header > ul > li:nth-child(2) > div > a', key: 'landing.nav_item_2' },
    { selector: 'body > div.header > ul > li:nth-child(3) > div > a', key: 'landing.nav_item_3' },
    { selector: 'body > div.header > div > div > a', key: 'landing.nav_item_4' },

    { selector: '#projects-section > h3', key: 'landing.projects_title' },
    
    { selector: '#team-section > h3', key: 'landing.the_team_title' },

    { selector: '#about-section > h3', key: 'landing.what_is_gosh_title' },
    { selector: '#about-section > p', key: 'landing.what_is_gosh_description' },

    { selector: '#share-section > h3', key: 'landing.make_noise_title' },
    { selector: '#share-section > p', key: 'landing.make_noise_description' },

    { selector: 'body > div.tiny-footer', key: 'landing.tiny_footer' },    
])
intl.translateStatics()

initGridBlockEffect(document.querySelector('.main-section-img'), data)
