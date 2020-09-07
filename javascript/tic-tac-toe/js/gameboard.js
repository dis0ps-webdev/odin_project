class Gameboard {
  constructor(targetDiv) {
    this.gamePositions = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.gamePieces = [" ", "X", "O"];
    this.targetDiv = targetDiv;
    this.currentPlayer = null;

    this._addCellListener();
    this._render();
  }

  _render() {
    this.targetDiv.innerHTML = "";
    this.gamePositions.forEach((position) => {
      let cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");

      let cellContent = document.createElement("div");
      cellContent.classList.add("cell-content");
      cellContent.textContent = this.gamePieces[position];
      cellDiv.appendChild(cellContent);

      this.targetDiv.appendChild(cellDiv);
    });
  }

  _addCellListener() {
    this.targetDiv.addEventListener("click", (e) =>
      this._handleCellClick(e, this)
    );
  }

  _handleCellClick(e, self) {
    let clickIndex = Array.from(e.currentTarget.children).indexOf(e.target);
    if (clickIndex != -1) {
      self.placeMark(clickIndex, self.currentPlayer.getMarker());
    }
  }

  setPlayer(player) {
    this.currentPlayer = player;
  }

  placeMark(position, marker) {
    if (this.gamePositions[position] == 0) {
      this.gamePositions[position] = this.gamePieces.indexOf(marker);
      this._render();
      return true;
    } else {
      return false;
    }
  }
}
export { Gameboard };
