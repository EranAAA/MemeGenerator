'use strict'

let gImgs = [];
let gCurrImg;
let gKeywordSearchCountMap = [
    { name: 'All', size: 1 }, //45
    { name: 'Man', size: 1.5 }, //45
    { name: 'Dog', size: 1 }, //30
    { name: 'Strong', size: 1.5 }, //15
    { name: 'Baby', size: 1.5 }, //15
    { name: 'Sweet', size: 1 }, //15
    { name: 'Movies', size: 1 }, //15
    { name: 'Toys', size: 1 } //15
]

_createImges()

function _createImg(id, keywords) {
    return {
        id,
        url: `img/imgsSquare/${id}.jpg`,
        keywords,
        //dimentions: getDimentions(id)
    }
}

function _createImges() {
    gImgs = [
        _createImg(1, ['Strong', 'Man']),
        _createImg(2, ['Dog', 'Baby']),
        _createImg(3, ['Dog', 'Baby']),
        _createImg(4, ['Cat', 'Sweet']),
        _createImg(5, ['Strong', 'Baby']),
        _createImg(6, ['Man']),
        _createImg(7, ['Sweet', 'Baby']),
        _createImg(8, ['Man']),
        _createImg(9, ['Sweet', 'Baby']),
        _createImg(10, ['Strong', 'Man']),
        _createImg(11, ['Strong', 'Man']),
        _createImg(12, ['Strong', 'Man']),
        _createImg(13, ['Movies', 'Man']),
        _createImg(14, ['Movies', 'Man']),
        _createImg(15, ['Movies', 'Man']),
        _createImg(16, ['Movies', 'Man']),
        _createImg(17, ['Strong', 'Man']),
        _createImg(18, ['Movies', 'Toys'])
    ]
}

function getDimentions(id) {
    const img = new Image();
    img.onload = function() {
        gImgs[id].dimentions = { w: this.width, h: this.height }
    }
    img.src = `img/imgsSquare/${id}.jpg`;
}

function getImages() {
    return gImgs
}

function getKeys() {
    return gKeywordSearchCountMap
}

function clickKey(index) {
    gKeywordSearchCountMap[index].size += 0.1
}

function filterImg(value) {
    _createImges()
    if (value === 'All') return
    let filterImg = gImgs.filter(img => img.keywords.includes(value))
    gImgs = filterImg

}