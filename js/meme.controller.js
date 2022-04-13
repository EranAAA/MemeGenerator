'use strict'

let gElCanvas;
let gCtx;

function openEditor(id) {

    updatePanel('Memes')

    let meme = getMeme()
    if (!id) id = meme.selectedImgId
    if (id !== meme.selectedImgId) {
        initMeme(id)
        meme.selectedImgId = id
    }

    renderMeme()
    draw()
}

function renderMeme() {

    let elMainSection = document.querySelector('.main-section')
    let srtHtml = `<canvas id="my-canvas" height="450" width="450"></canvas>`

    elMainSection.innerHTML = `
            <div class="main-editor flex gap50"> 
                ${srtHtml}
                <div class="editor-panel">
                    <textarea oninput="onInputText(this.value)" placeholder=" Describe yourself here..." class="textarea"></textarea>
                    
                    <label for="colorText"> 🎨
                    <input oninput="onInputColor(this.value)" type="color" id="colorText" style="display: none" value="#121212" />
                    </label>

                    <button onclick="onClickIncrease()" class="font-size-btn">A<span>+</span></button>
                    <button onclick="onClickDecrease()" class="font-size-btn">A<span>-</span></button>
                    <button onclick="onSwitchLine()" class="font-size-btn">⇅</button>
                    <button onclick="onAddLine()" class="font-size-btn">➕</button>
                    <button onclick="onAlign('left')" class="font-size-btn">➡️</button>
                    <button onclick="onAlign('right')" class="font-size-btn">⬅️</button>
                    <button onclick="onAlign('center')" class="font-size-btn">↔️</button>
                </div>
            </div>`

    gElCanvas = document.querySelector('#my-canvas');
    gCtx = gElCanvas.getContext('2d');
}

// Add a color picker button
// b. Add the button “increase/decrease” font

function drawImg() {
    //let elImg = getCurrImage()

    let img = new Image();
    img.src = `img/imgsSquare/${getMeme().selectedImgId}.jpg`;

    // Naive approach:
    // there is a risk that image is not loaded yet and nothing will be drawn on canvas
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    // drawLine(50, 50)
}

// function drawImg2() {
//     var img = new Image();
//     img.src = 'img/1.jpg';
//     img.onload = () => {
//         gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
//     };
// }

function drawText(txt, x, y, align, color, size, font) {
    gCtx.textBaseline = 'top'
    gCtx.textAlign = align
    gCtx.font = `bold ${size}px ${font}`
    gCtx.fillStyle = color
    gCtx.fill()
    gCtx.fillText(txt, x, y);
}

function draw() {
    let meme = getMeme().lines
    drawImg()

    //ElCanvas.width

    meme.map(line =>
        drawText(line.txt, line.x, line.y, line.align, line.color, line.size, line.font)
    )
}

function onInputText(txt) {
    inputText(txt)
    draw()
}

function onInputColor(color) {
    inputColor(color)
    draw()
}

function onClickIncrease() {
    clickIncrease()
    draw()
}

function onClickDecrease() {
    clickDecrease()
    draw()
}

function onSwitchLine() {
    switchLine()
    draw()
    document.querySelector('.textarea').value = getCurrLine().txt
}

function onAddLine() {
    createNewLine(200, 200, 'New Line', 40, 'center', '#ffd700', 'monospace')
    draw()
}

function onAlign(alignment) {
    alignText(alignment)
    draw()
}