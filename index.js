const selector = document.getElementById('selector')
const dropDown = document.getElementById('drop-down')
const colorPicker = document.getElementById('color-picker')
const getRandomColorSchemeBtn = document.getElementById('get-random-color-scheme')
const arrowIcon = document.getElementById('arrow-icon')
const colorCountInput = document.getElementById('color-count-input')
const countDownArrow = document.getElementById('count-down-arrow')
const countUpArrow = document.getElementById('count-up-arrow')
const colorCountText = document.getElementById('color-count-text')
colorCountInput.disabled
let colorCount = 5

const paletteModes = [
    {name: "Monochrome", isSelected: true, id: 0}, {name: "Monochrome-dark", isSelected: false, id: 1},  {name: "Monochrome-light", isSelected: false, id: 2}, {name: "Analogic", isSelected: false, id: 3}, {name: "Complement", isSelected: false, id: 4} , {name: "Analogic-complement", isSelected: false,id: 5}, {name: "Triad", isSelected: false, id: 6} 
]

function getSelectedPaletteMode(){
   return paletteModes.find(mode => mode.isSelected === true).name 
}

function handleSelectorClick(id){
    const selectedModeIndex = paletteModes.findIndex(mode => mode.id === id)
    const currentMode = paletteModes[selectedModeIndex]
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
        let title = mode.name.replace("-", " ");
        mode.isSelected ? classes = "select-items padding-bottom bold" : classes = "select-items padding-bottom"
        selectorHtml += 
            `<h1 class='${classes}' onclick='handleSelectorClick(${mode.id})'> ${title} </h1>`
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
                 hexValue = color.hex.value
                 colorName = color.name.value
                 colorPaletteHtml += `
                    <div class='color-container' style='background-color:${hexValue}'> 
                        <div class='color-code'>
                            <div class='color-data-container'>
                                <p> ${hexValue} </p>
                               <div class='flex center'> 
                                    <p class='bold'> ${colorName} </p> 
                                    <img src='./copy-icon.svg' class='clipboard' data-NewColorHex="${hexValue}">
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
    if(e.target.className === 'clipboard'){
        const currentHexCode = event.target.getAttribute("data-NewColorHex")
        if (window.clipboardData && window.clipboardData.setData) {
        return window.clipboardData.setData(currentHexCode, text);

    }
    else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = currentHexCode;
        textarea.style.position = "fixed"; 
        document.body.appendChild(textarea);
        textarea.select();
        document.getElementById(currentHexCode).classList.remove('invisible')
        setTimeout(function(){
            document.getElementById(currentHexCode).classList.add('invisible')
        }, "2000")
        try {
            return document.execCommand("copy");
        }
        catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return prompt("Copy to clipboard: Ctrl+C, Enter", currentHexCode);
        }
        finally {
            document.body.removeChild(textarea);
        }
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

getRandomColorSchemeBtn.addEventListener('click', function(){
    getRandomColor()
    getNewValues()
    hideDropDown() 
})

colorPicker.addEventListener('input', function(){
    getNewValues()
})

document.getElementById('main-div').addEventListener('click', function(){
    hideDropDown()
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

document.getElementById('main-div').addEventListener('click', function(e){
      copyToClipboard(e)
})