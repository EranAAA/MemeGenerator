'use strict'

let gElCanvas;
let gCtx;
let gStartPos
let gIsDownload = false
let gCurrWidth
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function openEditor(id) {
    updatePanel('Editor')

    if (!id) id = getMeme().selectedImgId
    if (id !== getMeme().selectedImgId) {
        initMeme(id)
        getMeme().selectedImgId = id
    }

    renderMeme()
    resizeCanvas()
    draw()
    addListeners()
}

function renderMeme() {

    let elMainSection = document.querySelector('.main-section')
    let srtHtmlCanvas = `<canvas id="my-canvas" height="535" width="535"></canvas>`

    let stickers = getStickers()
    let srtHtmlStickers = stickers.map(sticker => `<div onclick="onClickSticker('${sticker}')" class="stickers" >${sticker}</div>`)

    elMainSection.innerHTML = `
            <div class="main-editor flex gap1vw"> 
                <div class="canvas-container" > ${srtHtmlCanvas} </div>
                <div class="editor-panel">

                <textarea oninput="onInputText(this.value)" placeholder=" Describe yourself here..." class="textarea"></textarea>

                    <div class="control-all">
                        <div class="control-box"> 
                            <button onclick="onSwitchLine()" class="font-size-btn switch">⇅</button>
                            <button onclick="onAddLine()" class="font-size-btn add">+</button>
                            <button onclick="onDeleteLine()" class="font-size-btn delete">🗑</button>
                        </div>
                
                        <div class="change-box"> 
                            <input oninput="onInputColor(this.value)" type="color" id="colorText" value="#121212" class="color-btn"/>
                            <button onclick="onClickIncrease(this)" class="font-size-btn increase">A<span>+</span></button>
                            <button onclick="onClickDecrease(this)" class="font-size-btn increase">A<span>-</span></button>
                        
                            <button onclick="onAlign('left')" class="font-size-btn align">→</button>
                            <button onclick="onAlign('right')" class="font-size-btn align">←</button>
                            <button onclick="onAlign('center')" class="font-size-btn align">↔︎</button>
                            <select onchange="onChangeFont(this)" id="font" class="font-select">
                                <option value="Impact" >Impact</option>
                                <option value="poppins-medium">Poppins Medium</option>
                                <option value="monospace" selected>Monospace</option>
                                <option value="Segoe UI">Segoe UI</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="control-Carusel">
                        <div onclick="onNextStickers(-1)" class="slide-btn" >˱</div>
                        <div class="carusel" >
                            ${srtHtmlStickers.join('')}
                        </div>
                        <div onclick="onNextStickers(1)" class="slide-btn" >˲</div>
                    </div>
                    
                    <div class="btn-action" >
                        <button onclick="uploadImg()" class="share-btn">Share</button>
                        <a class="download-btn" onclick="onDownload(this)" href="#" download="Meme.jpg">DownLoad</a>
                        <button onclick="onSave()" class="save-btn">Save</button>
                    </div>
                </div>
            </div>`

    gElCanvas = document.querySelector('#my-canvas');
    gCtx = gElCanvas.getContext('2d');
}

function drawImg() {
    let img = new Image();
    let status = getStatusWhereToLoad()
    let imgIdMeme = getIdFromMeme()
    let imgFormMeme = localStorage.getItem(imgIdMeme)

    if (!status) {
        img.src = `img/imgsSquare/${getMeme().selectedImgId}.jpg`
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    } else {
        img.src = imgFormMeme
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    }
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawImg2() {
    let img = new Image();
    img.src = `img/imgsSquare/${getMeme().selectedImgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    };
}

function drawText(txt, x, y, align, color, size, font, idx) {
    let currIdx = getCurrLineIdx()

    gCtx.textBaseline = 'top'
        //gCtx.textAlign = align
    gCtx.font = `bold ${size}px ${font}`
    gCtx.fillStyle = color
    if (idx === currIdx && !gIsDownload) gCtx.strokeRect(x - 10, y - 5, (size / 2) * txt.length + 70, size * 1.3);
    gCtx.fill()
    gCtx.fillText(txt, x, y);
}

function draw() {
    let meme = getMeme().lines
    drawImg()

    meme.map((line, idx) => {
        drawText(line.txt, line.x, line.y, line.align, line.color, line.size, line.font, idx)
        line.width = (line.size / 2) * line.txt.length + 70
    })
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()

    window.addEventListener('resize', (v) => {
        if (gCurrPanel === 'Gallery') return
        resizeCanvas()
        draw()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        var rect = ev.target.getBoundingClientRect()
        pos = {
            x: ev.targetTouches[0].pageX - rect.left,
            y: ev.targetTouches[0].pageY - rect.top,
            movX: 50
        }
    }
    return pos
}

function onDown(ev) {
    const pos = getEvPos(ev)

    if (!isLineClicked(pos)) return

    setLineDrag(true)
    gStartPos = pos
}

function onMove(ev) {
    if (!getDragStatus()) return

    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y

    moveLine(dx, dy)
    gStartPos = pos
    draw()
}

function onUp(ev) {
    setLineDrag(false)
    draw()
        //document.body.style.cursor = 'grab'
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetWidth
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
    createNewLine(gElCanvas.width / 2 - 70, gElCanvas.width / 2 - 70, 'New Line', 40, 'left', '#0a3c16', 'monospace')
    draw()
}

function onAlign(alignment) {
    alignText(alignment, gElCanvas)
    draw()
}

function onDeleteLine() {
    deleteLine()
    draw()
}

function onChangeFont(el) {
    changeFont(el.value)
    draw()
}

function onDownload(el) {
    gIsDownload = true
    draw()
    downloadCanvas(el)
    gIsDownload = false
}

function onSave() {
    //let id = getCurrImgId()
    localStorage.setItem(makeId(), gElCanvas.toDataURL());
}

function onClickSticker(sticker) {
    createNewLine(gElCanvas.width / 2, gElCanvas.width / 2, sticker, 40, 'left', '#0a3c16', 'monospace')
    draw()
}

function onNextStickers(num) {
    // debugger
    nextStickers(num)
    renderStickers()
}

function renderStickers() {
    let elMainSection = document.querySelector('.carusel')
    let stickers = getStickers()
    let srtHtmlStickers = stickers.map(sticker => `<div onclick="onClickSticker('${sticker}')" class="stickers" >${sticker}</div>`)
    elMainSection.innerHTML = srtHtmlStickers.join('')
}