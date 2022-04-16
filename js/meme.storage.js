'use strict'

let gImgPicked;
let gIsImgPickedFromMeme = false

function renderSavedMeme() {
    //clearCanvas()

    let images = Object.entries(localStorage)
    let keys = getKeys()

    let elMainSection = document.querySelector('.main-section')
    let elKeyWords = keys.map((key, idx) => `<span onclick="onClickKey('${idx}')" style="font-size: ${key.size}vw;">${key.name}</span>`)
    let elSearch = `<div class="main-search flex justifySpaceBtween">   
                        <input type="text" class="text" placeholder="Serach"> 
                        <input type="file" class="file-input" name="image" onchange="onImgInput(event)" />
                        <div class="search-keys flex justifySpaceBtween center ">${elKeyWords.join('')}</div>
                    </div>`

    let elGallery = images.map(img =>
        `<div class="container-Saved">
            <img onclick="onImageClickEdit('${img[0]}')" src="${img[1]}" alt="" class="img">
            <button onclick="onClick('${img[0]}')" class="delete-btn">❌</button>
        </div>`)

    elMainSection.innerHTML = `${elSearch} <div class="main-gallery"> ${elGallery.join('')} </div>`
}

function onClick(id) {
    window.localStorage.removeItem(id);
    renderSavedMeme()
}

function onImageClickEdit(id) {
    gImgPicked = id
    gIsImgPickedFromMeme = true
    openEditor()
}

function getIdFromMeme() {
    return gImgPicked
}

function getStatusWhereToLoad() {
    return gIsImgPickedFromMeme
}

function setStatusToFalse() {
    gIsImgPickedFromMeme = false
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    let reader = new FileReader()
    reader.onload = (event) => {
        var img = new Image()
        img.src = event.target.result
        img.onload = onImageReady.bind(null, img)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    let dataURL = canvas.toDataURL();
    //let dataURL = canvas.toDataURL("image/png");

    let id = makeId()
    localStorage.setItem(id, dataURL);
    renderSavedMeme()
}