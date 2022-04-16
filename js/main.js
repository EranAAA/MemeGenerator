'use strict'

let gCurrPanel

function onChangePanel(tab) {
    if (gCurrPanel === tab) return
    if (tab === 'Gallery') renderGallery()
        // if (tab === 'Editor') openEditor()
    if (tab === 'Memes') renderSavedMeme()
        // if (tab === 'About') return

    gCurrPanel = tab
}

function updatePanel(name) {
    gCurrPanel = name
}