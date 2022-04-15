'use strict'

let gImgs = [];
let gCurrImg;
let gKeywordSearchCountMap = [
    { name: 'Joy', size: 10 }, //45
    { name: 'Dog', size: 10 }, //30
    { name: 'Murderer', size: 10 }, //15
    { name: 'Baby', size: 10 } //15
]

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

function getKeys() {
    return gKeywordSearchCountMap
}

function clickKey(index) {
    gKeywordSearchCountMap[index].size++
}