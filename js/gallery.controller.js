'use strict'


function renderGallery() {
    let images = getImages()

    let elMainSection = document.querySelector('.main-section')

    let elSearch = `<div class="main-search">   
                    <input type="text" class="text"> 
                    <div class="search-tips">Lorem ipsum dolor sit amet consectetur</div>
                </div>`

    let elGallery = images.map(img =>
        `<img onclick="onImageClick('${img.id}')" src="${img.url}" alt="" class="img">`
    )

    elMainSection.innerHTML = `${elSearch} <div class="main-gallery"> ${elGallery.join('')} </div>`

}

function onImageClick(id) {
    openEditor(id)
}