'use strict'

let gCurrPanel

function onInit() {
    renderGallery()
    gCurrPanel = 'Gallery'
}

function onChangePanel(tab) {
    console.log('in onchange panel');
    if (gCurrPanel === tab) return

    if (tab === 'Gallery') renderGallery()
    if (tab === 'Editor') openEditor()
    if (tab === 'Memes') renderSavedMeme()
    if (tab === 'About') return

    gCurrPanel = tab
}

function updatePanel(name) {
    gCurrPanel = name
}