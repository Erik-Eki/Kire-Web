var canvas = document.getElementById('gameCanvas')
var banner = document.getElementById('banner')
canvas.width = window.innerWidth
var context = canvas.getContext('2d')

var cellSize = 10
var rows = Math.round(canvas.height / cellSize)
var cols = Math.round(canvas.width / cellSize)
var grid = createGrid()

function createGrid() {
    let arr = new Array(cols)
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows)
        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j] = Math.random() > 0.5 ? 1 : 0
        }
    }
    return arr
}

function drawGrid() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const x = i * cellSize
            const y = j * cellSize
            if (grid[i][j] === 1) {
                context.fillStyle = '#000'
                context.fillRect(x, y, cellSize, cellSize)
            } else {
                context.fillStyle = '#fff'
                context.fillRect(x, y, cellSize, cellSize)
            }
        }
    }
}

function updateGrid() {
    let newGrid = createGrid()
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const neighbors = countNeighbors(grid, i, j)
            if (grid[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
                newGrid[i][j] = 0
            } else if (grid[i][j] === 0 && neighbors === 3) {
                newGrid[i][j] = 1
            } else {
                newGrid[i][j] = grid[i][j]
            }
        }
    }
    grid = newGrid
}

function countNeighbors(grid, x, y) {
    let sum = 0
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            const col = (x + i + cols) % cols
            const row = (y + j + rows) % rows
            sum += grid[col][row]
        }
    }
    sum -= grid[x][y] // remove current cell from sum
    return sum
}

var lastRender = 0
var fps = 30 // Adjust the frames per second to control the speed

function gameLoop(timestamp) {
    if (timestamp - lastRender >= 1000 / fps) {
        updateGrid()
        drawGrid()
        lastRender = timestamp
    }
    requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)