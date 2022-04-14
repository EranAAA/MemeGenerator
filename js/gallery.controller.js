'use strict'

let gCurrImgId;

function renderGallery() {
    let images = getImages()
    let keys = getKeys()
    let elMainSection = document.querySelector('.main-section')

    let elKeyWords = keys.map((key, idx) => `<span onclick="onClickKey('${idx}')" style="font-size: ${key.size}px;">${key.name}</span>`)


    let elSearch = `<div class="main-search flex justifySpaceBtween">   
                    <input type="text" class="text" placeholder="Serach"> 
                    <div class="search-keys flex justifySpaceBtween center ">${elKeyWords.join('')}</div>
                </div>`

    let elGallery = images.map(img =>
        `<img onclick="onImageClick('${img.id}')" src="${img.url}" alt="" class="img">`
    )

    elMainSection.innerHTML = `${elSearch} <div class="main-gallery"> ${elGallery.join('')} </div>`

}

function onImageClick(id) {
    openEditor(id)
    gCurrImgId = id

}

function getCurrImgId() {
    return gCurrImgId
}

function onClickKey(idx) {
    clickKey(idx)
    renderGallery()
}