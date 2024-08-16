const canvas = document.getElementById('canvas')
ctx = canvas.getContext('2d')

const width = canvas.width
const height = canvas.height

const pixelSize = 20

const rows = height / pixelSize
const cols = width / pixelSize

const FPS = 1000/60

var grid = []

var isCliking = false

ctx.fillStyle = "#ffffff"
ctx.strokeStyle = "#ffffff "


function setGrid() {
    for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
            // data = {"x": col, "y": row, "type": "vide"}
            
            if (row == 28 && col == 7){
                data = {"x": col, "y": row, "type": "blanc"}
            }else if (row == 30 && col == 7){
                data = {"x": col, "y": row, "type": "blanc"}
            }else if (row == 32 && col == 7){
                data = {"x": col, "y": row, "type": "blanc"}
            }else{
                data = {"x": col, "y": row, "type": "vide"}
            }

            grid.push(data)
        }
    }
}

setGrid()

function clearGrid() {
    grid.forEach(element => {
        element.type = "vide"
    });
}


function drawGrid() {
    ctx.clearRect(0, 0, width, height)
    grid.forEach(element => {
        x = element.x
        y = element.y
        type = element.type 

        if(type == "vide"){
            ctx.strokeRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
        }else if(type == "blanc"){
            ctx.fillStyle = "#ffffff"
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
        }

    });
}


canvas.addEventListener('click', (e)=>{
    x = Math.floor(e.offsetX / pixelSize)
    y = Math.floor(e.offsetY / pixelSize)
    index = y * 60 + x
    grid[index].type = "blanc"
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
})

canvas.addEventListener('mousedown' , (e)=>{
    console.log('mousedown')
    isCliking = true
})

canvas.addEventListener('mouseup', (e)=>{
    console.log('mouseup')
    isCliking = false
})

canvas.addEventListener('mousemove', (e) =>{
    if(isCliking){
        x = Math.floor(e.offsetX / pixelSize)
        y = Math.floor(e.offsetY / pixelSize)
        index = y * 60 + x
        grid[index].type = "blanc"
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
    }
})

document.addEventListener('keydown', (e)=>{
    console.log(e.keyCode)
    if(e.keyCode == 67){
        clearGrid()
    }
})

function loop(){

    for (let i = grid.length-1; i >= 0; i--) {
        x = grid[i].x
        y = grid[i].y
        type = grid[i].type
        index = (y + 1) * 60 + x

        if(type == "blanc"){
            if(y < 34){
                if(grid[index].type == "vide"){
                    grid[i].type = "vide"
                    grid[index].type = "blanc"
                }else if(grid[index].type != "vide"){
                    if(grid[index+1].type == "blanc" && grid[index-1].type == "blanc"){
                    }else if(grid[index+1].type == "vide" && grid[index-1].type == "vide"){
                        r = Math.random() * 1
                        if(r < 0.5){
                            grid[i].type = "vide"
                            grid[index+1].type = "blanc"
                        }else{
                            grid[i].type = "vide"
                            grid[index-1].type = "blanc"
                        }
                    }else{
                        if(grid[index+1].type == "vide"){
                            grid[i].type = "vide"
                            grid[index+1].type = "blanc"
                        }else{
                            grid[i].type = "vide"
                            grid[index-1].type = "blanc"
                        }
                    }
                } 
            }
        }
        
    }

    drawGrid()
}
setInterval(loop, FPS)