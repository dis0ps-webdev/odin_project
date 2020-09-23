class GameboardView {
  constructor(targetDiv) {
    this.targetDiv = targetDiv;
    this.messageDiv = document.querySelector(".message");
  }

  render(gameboard) {
    this.targetDiv.innerHTML = "";
    gameboard.getCurrentState().forEach((position) => {
      let cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");

      let cellContent = document.createElement("div");
      cellContent.classList.add("cell-content");
      cellContent.textContent = gameboard.gamePieces[position];
      cellDiv.appendChild(cellContent);

      this.targetDiv.appendChild(cellDiv);
    });
  }

  setMessage(text) {
    this.messageDiv.textContent = text;
  }

  resetMessage() {
    this.messageDiv.textContent = "";
  }

  bindClickCell(handler) {
    this.targetDiv.addEventListener("click", (e) => {
      let clickIndex = Array.from(e.currentTarget.children).indexOf(e.target);
      handler(clickIndex);
    });
  }
}

export { GameboardView };
