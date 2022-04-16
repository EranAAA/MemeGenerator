'use strict'

let gCurrImgId = 3

function onInit() {
    renderGallery()
    gCurrPanel = 'Gallery'
}

function renderGallery() {
    setStatusToFalse()

    let images = getImages()
    let keys = getKeys()
    let elMainSection = document.querySelector('.main-section')
    let elKeyWords = keys.map((key, idx) => `<span onclick="onClickKey('${idx}','${key.name}')" style="font-size: ${key.size}vw;">${key.name}</span>`)

    let elSearch = `<div class="main-search flex justifySpaceBtween">   
                        <select onchange="onFilter(this)" id="filter" class="text">
                                <option value="All" selected>Search for Key words</option>
                                <option value="All">All</option>
                                <option value="Strong" >Strong</option>
                                <option value="Baby">Baby</option>
                                <option value="Man" >Man</option>
                                <option value="Sweet">Sweet</option>
                                <option value="Dog">Dog</option>
                                <option value="Cat">Cat</option>
                                <option value="Movies">Movies</option>
                                <option value="Toys">Toys</option>
                        </select>
                        <div class="search-keys flex justifySpaceBtween center ">${elKeyWords.join('')}</div>
                    </div>`

    let elGallery = images.map(img =>
        `<img onclick="onImageClick('${img.id}')" src="${img.url}" alt="" class="img">`
    )
    elMainSection.innerHTML = `${elSearch} <div class="main-gallery"> ${elGallery.join('')} </div>`
}

//<input onkeyup="onFilter()" type="text" class="text" placeholder="Serach"> 


function onImageClick(id) {
    openEditor(id)
    gCurrImgId = id
}

function getCurrImgId() {
    return gCurrImgId
}

function onClickKey(idx, name) {
    clickKey(idx)
    filterImg(name)
    renderGallery()
}

function onFilter(el) {
    filterImg(el.value)
    renderGallery()
}