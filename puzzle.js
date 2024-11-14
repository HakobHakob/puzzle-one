const rows = 5
const columns = 5
let currTile
let otherTile
let turns = 0

window.onload = () => {
  const board = document.getElementById("board")

  // Fill an array with undefined values and use forEach to create the board
  Array(rows)
    .fill()
    .forEach((_, row) => {
      Array(columns)
        .fill()
        .forEach((_, col) => {
          const tile = document.createElement("img")
          tile.src = "./images/blank.png"
          // Drag functionality
          tile.addEventListener("dragstart", dragStart) // click on imgae to drag
          tile.addEventListener("dragover", dragOver) // drag an image
          tile.addEventListener("dragenter", dragEnter) // dragging an image into another one
          tile.addEventListener("dragleave", dragLeave) // drop an image onto another one
          tile.addEventListener("drop", dragDrop) //drop an image onto another one
          tile.addEventListener("dragend", dragEnd) // after we completed dragDrop
          board.append(tile)
        })
    })

  // pieces
  let pieces = []
  Array.from({ length: rows * columns }).forEach((_, index) => {
    pieces.push((index + 1).toString()) //put "1" to "25" into the array (puzzle images names)
  })

  pieces.forEach((_, index) => {
    const j = Math.floor(Math.random() * pieces.length)
    // Swap elements
    ;[pieces[index], pieces[j]] = [pieces[j], pieces[index]]
  })

  const piecesContainer = document.getElementById("pieces")
  pieces.forEach((piece) => {
    const tile = document.createElement("img")
    tile.src = `./images/${piece}.png`
    // Drag functionality
    tile.addEventListener("dragstart", dragStart) // click on imgae to drag
    tile.addEventListener("dragover", dragOver) // drag an image
    tile.addEventListener("dragenter", dragEnter) // dragging an image into another one
    tile.addEventListener("dragleave", dragLeave) // drop an image onto another one
    tile.addEventListener("drop", dragDrop) //drop an image onto another one
    tile.addEventListener("dragend", dragEnd) // after we completed dragDrop
    piecesContainer.append(tile)
  })
}

// Drag tiles
function dragStart() {
  currTile = this //this refers to image that was clicked on for dragging
}
function dragOver(e) {
  e.preventDefault()
}
function dragEnter(e) {
  e.preventDefault()
}
function dragLeave() {}
function dragDrop() {
  otherTile = this //this refers to image that is being dropped on
}
function dragEnd() {
  if (currTile.src.includes("blank")) return
  let currImg = currTile.src
  let otherImg = otherTile.src
  currTile.src = otherImg
  otherTile.src = currImg
  turns += 1
  document.getElementById("turns").innerText = turns
}
