const canvas = document.getElementById('canvas')
ctx = canvas.getContext('2d')

const width = canvas.width
const height = canvas.height

const pixelSize = 20

const rows = height / pixelSize
const cols = width / pixelSize

console.log(width, height)
console.log(rows, cols)

ctx.fillStyle = "#ffffff"
ctx.strokeStyle = "#ffffff "



function drawGrid() {
    for (let row = 0; row < 10; row += 1) {
        ctx.strokeRect(row * pixelSize, 0, pixelSize, pixelSize)
    }
    // for (let row = 0; row < rows; row += 1) {
    //     for (let col = 0; col < cols; col += 1) {
    //         ctx.strokeRect(row * pixelSize, col * pixelSize, pixelSize, pixelSize)
    //         console.log(row, col)
    //     }
    // }
}

// drawGrid()

ctx.strokeStyle = "#ffffff "
ctx.strokeRect(0, 0, pixelSize, pixelSize)