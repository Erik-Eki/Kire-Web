const rows = 10
const cols = 10
const cellSize = 10

const grid = document.getElementById('grid')
const cells = []

// Create grid
for (let row = 0; row < rows; row++) {
    cells[row] = []
    for (let col = 0; col < cols; col++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        cell.style.width = `${cellSize}px`
        cell.style.height = `${cellSize}px`
        grid.appendChild(cell)
        cells[row][col] = cell
    }
}

// Initialize grid with random state
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        if (Math.random() > 0.5) {
            cells[row][col].classList.add('alive')
        }
    }
}

// Apply Conway's Game of Life rules
function nextGeneration() {
    const nextCells = []

    for (let row = 0; row < rows; row++) {
        nextCells[row] = []
        for (let col = 0; col < cols; col++) {
            const neighbors = countNeighbors(row, col)

            if (cells[row][col].classList.contains('alive')) {
                if (neighbors < 2 || neighbors > 3) {
                    nextCells[row][col] = false
                } else {
                    nextCells[row][col] = true
                }
            } else {
                if (neighbors === 3) {
                    nextCells[row][col] = true
                } else {
                    nextCells[row][col] = false
                }
            }
        }
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (nextCells[row][col]) {
                cells[row][col].classList.add('alive')
            } else {
                cells[row][col].classList.remove('alive')
            }
        }
    }
}

function countNeighbors(row, col) {
    let count = 0
    const offsets = [-1, 0, 1]

    offsets.forEach((rowOffset) => {
        offsets.forEach((colOffset) => {
            if (rowOffset === 0 && colOffset === 0) {
                return
            }

            const neighborRow = row + rowOffset
            const neighborCol = col + colOffset

            if (neighborRow >= 0 && neighborRow < rows && neighborCol >= 0 && neighborCol < cols) {
                if (cells[neighborRow][neighborCol].classList.contains('alive')) {
                    count++
                }
            }
        })
    })

    return count
}

// Update grid on each generation
setInterval(() => {
    nextGeneration()
}, 500)