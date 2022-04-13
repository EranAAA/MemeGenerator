'use strict'

let gCurrPanel

function onInit() {
    renderGallery()
    gCurrPanel = 'Gallery'
}

function onChangePanel(tab) {
    if (gCurrPanel === tab) return

    if (tab === 'Gallery') renderGallery()
    if (tab === 'Memes') openEditor()
    if (tab === 'About') return

    gCurrPanel = tab
}

function updatePanel(name) {
    gCurrPanel = name
}