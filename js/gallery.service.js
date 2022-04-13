'use strict'

let gImgs = [];
let gCurrImg;

_createImges()

function _createImg(id) {
    return {
        id,
        url: `img/imgsSquare/${id}.jpg`,
        keywords: ['funny', 'cat']
    }
}

function _createImges() {
    let imgsCount = 18
    for (let i = 0; i < imgsCount; i++) {
        gImgs.push(_createImg(i + 1))
    }

}

function getImages() {
    return gImgs
}

// function getCurrImage() {
//     return gCurrImg
// }

// function imageClick(elImg) {
//     gCurrImg = elImg
// }