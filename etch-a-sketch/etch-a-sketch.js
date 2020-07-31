const container = document.querySelector(".grid");
const clearButton = document.querySelector("#clear");
const newButton = document.querySelector("#new");
let lastSize = 0;

function createGrid(gridSize) {
  container.innerHTML = "";
  lastSize = gridSize;
  for (let row = 1; row <= gridSize; row++) {
    let rowElement = document.createElement("div");
    rowElement.classList.add("row");

    for (let column = 1; column <= gridSize; column++) {
      let cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      cellElement.addEventListener("mouseover", fillCell);
      rowElement.appendChild(cellElement);
    }

    container.appendChild(rowElement);
  }
}

function fillCell() {
  this.classList.add("fill");
}

function clearGrid() {
  createGrid(lastSize);
}

createGrid(16);
clearButton.addEventListener("click", clearGrid);
newButton.addEventListener("click", () => {
  let gridSize = prompt("Enter grid size");
  createGrid(gridSize);
});
