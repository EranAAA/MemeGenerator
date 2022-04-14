'use strict'

let gElCanvas;
let gCtx;
let gStartPos
let gPreDownload
let gCurrWidth
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function openEditor(id) {

    updatePanel('Editor')

    // remove later!!!
    let meme = getMeme()
    if (!id) id = meme.selectedImgId
    if (id !== meme.selectedImgId) {
        initMeme(id)
        meme.selectedImgId = id
    }
    // remove later!!!

    renderMeme()
    resizeCanvas()
    addListeners()
    draw()
}

function renderMeme() {

    let elMainSection = document.querySelector('.main-section')
    let srtHtmlCanvas = `<canvas id="my-canvas" height="535" width="535"></canvas>`

    elMainSection.innerHTML = `
            <div class="main-editor flex gap1vw"> 
                <div class="canvas-container" > ${srtHtmlCanvas} </div>
                <div class="editor-panel">

                <textarea oninput="onInputText(this.value)" placeholder=" Describe yourself here..." class="textarea"></textarea>

                    <div class="control-box"> 
                        <button onclick="onSwitchLine()" class="font-size-btn switch">⇅</button>
                        <button onclick="onAddLine()" class="font-size-btn add">+</button>
                        <button onclick="onDeleteLine()" class="font-size-btn delete">🗑</button>
                    </div>
             
                        <div class="control-box"> 
                            <input oninput="onInputColor(this.value)" type="color" id="colorText" value="#121212" class="color-btn"/>
                            <button onclick="onClickIncrease(this)" class="font-size-btn increase">A<span>+</span></button>
                            <button onclick="onClickDecrease(this)" class="font-size-btn increase">A<span>-</span></button>
                        </div>

                        <div class="control-box"> 
                            <button onclick="onAlign('left')" class="font-size-btn align">→</button>
                            <button onclick="onAlign('right')" class="font-size-btn align">←</button>
                            <button onclick="onAlign('center')" class="font-size-btn align">↔︎</button>
                        </div>

                        <select onchange="onChangeFont(this)" id="font" class="font-select">
                            <option value="Impact" >Impact</option>
                            <option value="poppins-medium">Poppins Medium</option>
                            <option value="monospace" selected>Monospace</option>
                            <option value="Segoe UI">Segoe UI</option>
                        </select>
                    
                    <div class="btn-action" >
                        <button onclick="onShare()" class="share-btn">Share</button>
                        <a class="download-btn" onclick="onDownload(this)" href="#" download="Meme.jpg">DownLoad</a>
                        <button onclick="onSave()" class="share-btn">Save</button>
                    </div>
                </div>
            </div>`

    gElCanvas = document.querySelector('#my-canvas');
    gCtx = gElCanvas.getContext('2d');
}

function drawImg() {
    let img = new Image();
    img.src = `img/imgsSquare/${getMeme().selectedImgId}.jpg`;
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

// function drawImg2() {
//     var img = new Image();
//     img.src = 'img/1.jpg';
//     img.onload = () => {
//         gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
//     };
// }

function drawText(txt, x, y, align, color, size, font, idx) {
    let currIdx = getCurrLineIdx()

    gCtx.textBaseline = 'top'
    gCtx.textAlign = align
    gCtx.font = `bold ${size}px ${font}`
    gCtx.fillStyle = color
    if (idx === currIdx) gCtx.strokeRect(x - 10, y - 5, (size / 2) * txt.length + 70, size * 1.3);
    gCtx.fill()
    gCtx.fillText(txt, x, y);
}

function draw() {
    let meme = getMeme().lines
    drawImg()

    // Do consturctor
    meme.map((line, idx) =>
        drawText(line.txt, line.x, line.y, line.align, line.color, line.size, line.font, idx)
    )
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()

    window.addEventListener('resize', (v) => {
        resizeCanvas()
        draw()
    })

    // visualViewport.onresize = function(ev) {
    //     //debugger
    //     if (ev.target.width <= gCurrWidth) {
    //         changeSize(false)
    //     } else if (ev.target.width > gCurrWidth) {
    //         changeSize(true)
    //     }
    //     gCurrWidth = ev.target.width
    // }
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
    console.log('pos', pos);

    if (!isLineClicked(pos)) return

    setLineDrag(true)
    gStartPos = pos
}

function onMove(ev) {
    if (!getDragStatus()) return
    console.log('Moving')

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
        // console.log(elContainer.offsetHeight, elContainer.offsetWidth);

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
    createNewLine(200, 200, 'New Line', 40, 'left', '#ffd700', 'monospace')
    draw()
}

function onAlign(alignment) {
    alignText(alignment)
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
    downloadCanvas(el)
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'Meme.jpg'
}

function onSave() {
    let id = getCurrImgId()
    localStorage.setItem(id, gElCanvas.toDataURL());
}

function makeId(length = 3) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return 'canvas_' + txt;
}