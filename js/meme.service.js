'use strict'

let gMeme;

_createMeme()

function _createMeme() {
    gMeme = {
        selectedImgId: 5,
        selectedLineIdx: 0,
        lines: [{
            x: 20,
            y: 40,
            txt: 'Line NO1',
            size: 40,
            align: 'left',
            color: '#121212',
            font: 'monospace',
            isDrag: false
        }, {
            x: 20,
            y: 200,
            txt: 'Line NO2',
            size: 40,
            align: 'left',
            color: '#121212',
            font: 'monospace',
            isDrag: false
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
        font,
        isDrag: false
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

function getCurrLineIdx() {
    return gMeme.lines.findIndex((line, idx) => gMeme.selectedLineIdx === idx)
}

function isLineClicked(clickedPos) {
    let isTrue = false
    gMeme.lines.some((line, idx) => {
        const { x, y, txt, size } = line
        let widthX = (size / 2) * txt.length + x + 60
        if ((clickedPos.x <= widthX && clickedPos.x >= x) &&
            (clickedPos.y <= size * 1.2 + y && clickedPos.y >= y)) {
            console.log('In Frame')
            gMeme.selectedLineIdx = idx
            isTrue = true
        }
    })
    return isTrue
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].x += dx
    gMeme.lines[gMeme.selectedLineIdx].y += dy
}

function setLineDrag(boolean) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = boolean
}

function getDragStatus() {
    return gMeme.lines[gMeme.selectedLineIdx].isDrag
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

// function changeSize(bool) {
//     if (bool) gMeme.lines.map(line => line.size = line.size * 0.3)
//     else if (!bool) {
//         gMeme.lines.map(line => line.size = line.size - 0.3)
//     }
// }

function clickDecrease() {
    gMeme.lines[gMeme.selectedLineIdx].size--
}

function alignText(alignment) {
    gMeme.lines[gMeme.selectedLineIdx].align = alignment
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function changeFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function switchLine() {
    if (gMeme.lines.length - 1 === gMeme.selectedLineIdx) {
        return gMeme.selectedLineIdx = 0
    }
    return gMeme.selectedLineIdx++
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'Meme.jpg'
}