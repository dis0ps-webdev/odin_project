class Gameboard {
  constructor() {
    this.resetState();
    this.gamePieces = [" ", "X", "O"];
    this.winner = undefined;
  }

  bindGameboardUpdated(callback) {
    this.onGameboardUpdated = callback;
  }

  setPlayer(player) {
    this.currentPlayer = player;
  }

  isTie() {
    let emptyIndex = this.gamePositions.findIndex((cell) => cell == 0);
    if (emptyIndex == -1) {
      return true;
    } else {
      return false;
    }
  }

  hasWinner() {
    let tripletList = {
      row1: [0, 1, 2],
      row2: [3, 4, 5],
      row3: [6, 7, 8],
      col1: [0, 3, 6],
      col2: [1, 4, 7],
      col3: [2, 5, 8],
      diag1: [0, 4, 8],
      diag2: [2, 4, 6],
    };
    for (const tripletLocation in tripletList) {
      if (this._isWinningTriplet(tripletList[tripletLocation])) {
        return true;
        break;
      }
    }
    return false;
  }

  getWinner() {
    return this.winner;
  }

  _isWinningTriplet(indexes) {
    let triplet = [];
    let winningTriplet = false;
    let doSumTriplet = true;

    indexes.forEach((index) => {
      let positionValue = this.gamePositions[index];
      triplet.push(positionValue);
      if (positionValue == 0) {
        doSumTriplet = false;
      }
    });

    if (doSumTriplet) {
      let tripletSum = triplet.reduce(
        (value, accumulator) => (accumulator += value)
      );
      if (tripletSum == 3) {
        winningTriplet = true;
        this.winner = "X";
      }
      if (tripletSum == 6) {
        winningTriplet = true;
        this.winner = "O";
      }
    }
    return winningTriplet;
  }

  resetState() {
    this.gamePositions = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  setState(state) {
    this.gamePositions = Array.from(state);
  }

  getCurrentState() {
    return this.gamePositions;
  }

  getNumOpenPositions() {
    let openPositions = this.gamePositions.filter((position) => {
      return position == 0;
    });
    return openPositions.length;
  }

  placeMark(position, marker, simulate = false) {
    if (this.gamePositions[position] == 0) {
      this.gamePositions[position] = this.gamePieces.indexOf(marker);
      if (!simulate) {
        this.onGameboardUpdated(this);
      }
      return true;
    } else {
      return false;
    }
  }
}

export { Gameboard };
