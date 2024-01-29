const selector = document.getElementById('selector')
const dropDown = document.getElementById('drop-down')
const colorPicker = document.getElementById('color-picker')
const mainDiv = document.getElementById('main-div')
const getRandomColorSchemeBtn = document.getElementById('get-random-color-scheme')
const arrowIcon = document.getElementById('arrow-icon')
const colorCountInput = document.getElementById('color-count-input')
const countDownArrow = document.getElementById('count-down-arrow')
const countUpArrow = document.getElementById('count-up-arrow')
const colorCountText = document.getElementById('color-count-text')

colorCountInput.disabled = false
let colorCount = 5

const paletteModes = [
    { name: "Monochrome", isSelected: true, id: 0 },
    { name: "Monochrome-dark", isSelected: false, id: 1 },
    { name: "Monochrome-light", isSelected: false, id: 2 },
    { name: "Analogic", isSelected: false, id: 3 },
    { name: "Complement", isSelected: false, id: 4 },
    { name: "Analogic-complement", isSelected: false, id: 5 },
    { name: "Triad", isSelected: false, id: 6 },
]

function getSelectedPaletteMode(){
   return paletteModes.find(mode => mode.isSelected === true).name 
}

function handleSelectorClick(index){
    const currentMode = paletteModes[index]

    paletteModes.forEach(mode => mode.isSelected = false)
    currentMode.isSelected = true
    toggleDropDown()
    renderMenu()
    getNewValues()
}

function renderMenu(){  
    let selectorHtml = ``
    let classes = ""

    paletteModes.forEach(mode => {
        let title = mode.name.replace("-", " ")
        mode.isSelected ? classes = "select-items padding-bottom bold" : classes = "select-items padding-bottom"
        selectorHtml += 
            `<h1 class='${classes}' data-id='${mode.id}'> ${title} </h1>`
    })
    dropDown.innerHTML = selectorHtml
    document.getElementById('selected-item').innerHTML = `${getSelectedPaletteMode()}`
    colorCountText.innerHTML = `${colorCount} colors`
    if(colorCount === 3){
        countDownArrow.classList.remove('active-arrow')
    } else{
        countDownArrow.classList.add('active-arrow')
    } 
    
    if(colorCount === 6){
        countUpArrow.classList.remove('active-arrow')   
    } else{
        countUpArrow.classList.add('active-arrow')
    }
}

function fetchColorPalette(selectedColor, selectedPaletteMode, colorCount){
    const fetchLink = `https://www.thecolorapi.com/scheme?hex=${selectedColor}&mode=${selectedPaletteMode}&named=true&count=${colorCount}`
    fetch(fetchLink, {method: 'GET'})
        .then(res => res.json())
        .then(colorDataArr => {
            let colorPaletteHtml = ``
             colorDataArr.colors.forEach(color => {
                 const hexValue = color.hex.value
                 const colorName = color.name.value
                 colorPaletteHtml += `
                    <div class='color-container' style='background-color:${hexValue}'> 
                        <div class='color-code'>
                            <div class='color-data-container'>
                                <p> ${hexValue} </p>
                               <div class='flex center'> 
                                    <p class='bold'> ${colorName} </p> 
                                    <div class='clipboard' data-NewColorHex="${hexValue}">
                                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 115.77 122.88" style="enable-background:new 0 0 115.77 122.88" xml:space="preserve">
                                        <style type="text/css">.st0{fill-rule:evenoddclip-rule:evenodd}</style><g><path class="st0" d="M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z"/>
                                        </g>
                                        </svg>
                                    </div>
                               </div>
                               <p class='copy-message invisible' id='${hexValue}'> Copied </p>
                            </div>
                        </div>
                    </div>
                 `
            })
            document.getElementById('main-div').innerHTML = colorPaletteHtml
    })
}

function getNewValues(){
    colorCountInput.value = `${colorCount} colors`
    fetchColorPalette(colorPicker.value.slice(1), getSelectedPaletteMode().toLocaleLowerCase(), colorCount)
}

function getRandomColor(){
    colorPicker.value = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase()}`
}

function toggleDropDown(){
    dropDown.classList.toggle('hidden')
    arrowIcon.classList.toggle('arrow-icon-active')  
}

function hideDropDown(){
    dropDown.classList.add('hidden')
    arrowIcon.classList.remove('arrow-icon-active')  
}

function copyToClipboard(e){
    if (e.target.parentElement.className === 'clipboard') {
        const currentHexCode = e.target.parentElement.getAttribute("data-NewColorHex")
        const textArea = document.createElement("textarea")
        textArea.value = currentHexCode

        document.body.appendChild(textArea)

        const range = document.createRange()
        range.selectNode(textArea)
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(range)
        try {
            document.execCommand('copy')
            document.getElementById(currentHexCode).classList.remove('invisible')
            setTimeout(function () {
                document.getElementById(currentHexCode).classList.add('invisible')
            }, 2000)
        } catch (err) {
            console.error('Unable to copy to clipboard', err)
        } finally {
            document.body.removeChild(textArea)
        }
    }
}

getRandomColor()

renderMenu()

getNewValues()

selector.addEventListener('click', function(){
    toggleDropDown()
    renderMenu()
})

dropDown.addEventListener('click', function(e) {
    const target = e.target
    
    if (e.target.className === 'clipboard') {
        const currentHexCode = e.target.getAttribute("data-NewColorHex")
        const id = target.getAttribute('data-id')
        handleSelectorClick(id)
    }
})

getRandomColorSchemeBtn.addEventListener('click', function(){
    getRandomColor()
    getNewValues()
    hideDropDown() 
})

colorPicker.addEventListener('input', function(){
    getNewValues()
})

countUpArrow.addEventListener('click', function(){
    if(colorCount < 6){
        ++ colorCount
        renderMenu()
        getNewValues()
    }
})

countDownArrow.addEventListener('click', function(){
    if(colorCount > 3){
        -- colorCount
        renderMenu()
        getNewValues()
    }
})

mainDiv.addEventListener('click', function(e){
    copyToClipboard(e)
})

mainDiv.addEventListener('click', function(){
    hideDropDown()
})