'use strict'

let gMeme;

_createMeme()

function _createMeme() {
    gMeme = {
        selectedImgId: 5,
        selectedLineIdx: 0,
        lines: [{
            x: 200,
            y: 40,
            txt: 'Your Header',
            size: 40,
            align: 'center',
            color: '#121212',
            font: 'monospace'
        }, {
            x: 200,
            y: 350,
            txt: 'Add Somethings',
            size: 40,
            align: 'center',
            color: '#121212',
            font: 'monospace'
        }]
    }
}

function createNewLine(x, y, txt, size, align, color, font) {
    gMeme.lines.push({
        x,
        y,
        txt,
        size,
        align,
        color,
        font
    })
}

function getMeme() {
    return gMeme
}

function initMeme(id) {
    _createMeme()
    gMeme.selectedImgId = id
}

function getCurrLine() {
    return gMeme.lines.find((line, idx) => gMeme.selectedLineIdx === idx)
}

function inputText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function inputColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function clickIncrease() {
    gMeme.lines[gMeme.selectedLineIdx].size++
}

function clickDecrease() {
    gMeme.lines[gMeme.selectedLineIdx].size--
}

function alignText(alignment) {
    gMeme.lines[gMeme.selectedLineIdx].align = alignment
}

function switchLine() {
    if (gMeme.lines.length - 1 === gMeme.selectedLineIdx) {
        return gMeme.selectedLineIdx = 0
    }
    return gMeme.selectedLineIdx++
}