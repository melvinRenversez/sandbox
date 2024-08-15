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
let w = 10;
let cols, rows;


function setup() {
    createCanvas(1200, 700);
    cols = width / w
    rows = height / w
    grid = make2DArray(cols, rows)
    grid[39][10] = 1
    grid[39][15] = 1
    grid[39][20] = 1
    grid[0][10] = 1
    grid[0][15] = 1
    grid[0][20] = 1
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
                let bellow = grid[i][j+1]
                if (bellow == 0 && j < cols){
                    nextGrid[i][j] = 0
                    nextGrid[i][j + 1] = 1
                }else if (j < cols - 1){
                    let bellowL
                    let bellowR
                    if(i - 1 > 0){
                        bellowL = grid[i - 1][j + 1]
                    }
                    if(i + 1 < rows){
                        bellowR = grid[i + 1][j + 1]
                    }
                    if(bellowL == 0 && bellowR == 0){
                        par = Math.random()
                        if(par < 0.5){
                            nextGrid[i][j] = 0
                            nextGrid[i - 1][j + 1] = 1
                        }else{
                            nextGrid[i][j] = 0
                            nextGrid[i + 1][j + 1] = 1
                        }
                    }else if(bellowL == 0 && i - 1 > 0){
                        nextGrid[i][j] = 0
                        nextGrid[i - 1][j + 1] = 1
                    }else if (bellowR == 0){
                        nextGrid[i][j] = 0
                        nextGrid[i + 1][j + 1] = 1
                    }else{
                        nextGrid[i][j] = 1
                    }
                }else{
                    nextGrid[i][j] = 1
                }
            }
        }
    }    
    grid = nextGrid
}