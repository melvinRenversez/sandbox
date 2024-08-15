function make2DArray(cols, rows){
    let arr = new Array(cols)
    for (let i = 0; i < arr.length; i++){
      arr[i] = new Array(rows)
      for (let j = 0; j < arr[i].length; j++){
        arr[i][j] = 0
      }
    }
    return arr;
}

let grid;
let w = 20;
let cols, rows;


function setup() {
    createCanvas(1200, 700);
    cols = width / w
    rows = height / w
    console.log("c:", cols, "r:", rows)
    grid = make2DArray(cols, rows)
    grid[59][10] = 1
    grid[0][15] = 1
    grid[0][20] = 1
    grid[39][22] = 1
    grid[39][24] = 1
    grid[39][26] = 1
}

function mouseDragged(){
    let col = floor( mouseX / w)
    let row = floor( mouseY / w)
    if(col >= 0 && col < cols){
        grid[col][row] = 1
    }
}
function mousePressed(){
    let col = floor( mouseX / w)
    let row = floor( mouseY / w)
    if(col >= 0 && col < cols){
        grid[col][row] = 1
    }
}

function checkBottom(col, row){
    nextPos = grid[col][row + 1]
    if(nextPos == 0){
        return true
    }
}

function checkBottomLeft(col, row){
    if(col > 0){
        nextPos = grid[col - 1][row + 1]
        if(nextPos == 0){
            return true
        }
    }
}

function checkBottomRight(col, row){
    if(col < cols - 1){
        nextPos = grid[col + 1][row + 1]
        if(nextPos == 0){
            return true
        }
    }
}

function draw() {
    background(0);
    
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            stroke(255)
            fill(grid[i][j]*255)
            let x = i * w
            let y = j * w
            square(x, y, w)
        }
    }

    let nextGrid = make2DArray(cols, rows)
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            let state = grid[i][j]
            if (state == 1){
                let bellow = checkBottom(i, j)
                let bellowL = checkBottomLeft(i, j)
                let bellowR = checkBottomRight(i, j)
                if(bellow){
                    nextGrid[i][j] = 0
                    nextGrid[i][j + 1] = 1
                }else{
                    if(bellowL && bellowR){
                        if(Math.random() < 0.5){
                            nextGrid[i][j] = 0
                            nextGrid[i - 1][j + 1] = 1
                        }else{
                            nextGrid[i][j] = 0
                            nextGrid[i + 1][j + 1] = 1
                        }
                    }else if(bellowL){
                        nextGrid[i][j] = 0
                        nextGrid[i - 1][j + 1] = 1
                    }else if(bellowR){
                        nextGrid[i][j] = 0
                        nextGrid[i + 1][j + 1] = 1
                    }else{
                        nextGrid[i][j] = 1
                    }
                }
            }
        }
    }    
    grid = nextGrid
}