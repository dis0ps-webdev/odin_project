// Shout out to the following folks on minimax references
// https://github.com/pret3nti0u5/Tic-Tac-Toe/blob/master/script.js
// Daniel Shiffman: https://www.youtube.com/watch?v=trKjYdBASyQ

import { Gameboard } from "./Gameboard.js";
class GameController {
  constructor(gameboard, view) {
    this.model = gameboard;
    this.view = view;

    this.model.bindGameboardUpdated(this.onGameboardUpdated.bind(this));
    this.view.bindClickCell(this.handleCellClick.bind(this));

    this.view.render(this.model);
  }

  startNewGame(firstPlayer, secondPlayer) {
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;

    this.currentPlayer = this.firstPlayer;

    this.resetGame(50);
  }

  onGameboardUpdated() {
    this._checkEndGame(this.model);
    this._swapPlayers();
    this._checkNonHuman();

    this.view.render(this.model);
  }

  resetGame(timeOut) {
    setTimeout(() => {
      this.model.resetState();
      this._swapPlayers();
      this.onGameboardUpdated();
    }, timeOut);
  }
  _checkEndGame(board) {
    if (board.hasWinner()) {
      console.log("Winner!");
      console.log(this.currentPlayer);
      this.resetGame(1000);
    } else {
      if (this.model.isTie()) {
        console.log("Tie!");
        this.resetGame(1000);
      }
    }
  }

  _swapPlayers() {
    if (this.currentPlayer == this.firstPlayer) {
      this.currentPlayer = this.secondPlayer;
    } else {
      this.currentPlayer = this.firstPlayer;
    }
  }

  _checkNonHuman() {
    if (!this.currentPlayer.ishuman) {
      setTimeout(() => {
        if (this.model.getNumOpenPositions() == 9) {
          this._decideRandomMove(this.currentPlayer);
        } else {
          this._decideBestMove(this.currentPlayer);
        }
      }, 50);
    }
  }

  _decideRandomMove(player) {
    let randomMove = 0;
    let validMove = true;
    do {
      let potentialMove = Math.floor(Math.random() * 9);
      validMove = this.model.placeMark(potentialMove, player.getMarker());
    } while (!validMove);
  }

  _decideBestMove(player) {
    let bestScore = -Infinity;
    let bestMove = null;

    //loop through available moves
    this.model.getCurrentState().forEach((positionValue, index) => {
      if (positionValue == 0) {
        let possibleBoard = new Gameboard();
        possibleBoard.setState(this.model.getCurrentState());
        possibleBoard.placeMark(index, player.getMarker(), true);

        //evaluate move
        let score = this._minimax(player, possibleBoard, 0, false);
        if (score >= bestScore) {
          bestScore = score;
          bestMove = index;
        }
      }
    });

    //finally make best move
    this.model.placeMark(bestMove, player.getMarker());
  }

  _minimax(player, board, depth = 0, maximize = true) {
    let scoreMap = {};
    let decidingPlayer = null;
    let opponentPlayer = null;

    //allow for changing maximizing player
    if (player.getMarker() == "O") {
      decidingPlayer = "O";
      opponentPlayer = "X";
      scoreMap = {
        O: 100,
        X: -100,
      };
    } else {
      decidingPlayer = "X";
      opponentPlayer = "O";
      scoreMap = {
        X: 100,
        O: -100,
      };
    }

    //TODO: Why does limiting depth produces better decision?  Need to study minimax and decision trees more
    //4 is the sweet spot, any less and cpu vs cpu results in wins
    let maxDepth = 9;
    let debug = false;

    //check terminal condition
    if (board.hasWinner()) {
      return scoreMap[board.getWinner()];
    }
    if (board.isTie()) {
      return 0;
    }
    if (depth > maxDepth) {
      return 0;
    }

    //loop through possible boards
    if (!maximize) {
      //minimizing turn
      let bestScore = Infinity;

      board.getCurrentState().forEach((positionValue, index) => {
        if (positionValue == 0) {
          //clone board
          let possibleBoard = new Gameboard();
          possibleBoard.setState(board.getCurrentState());
          possibleBoard.placeMark(index, opponentPlayer, true);

          //evaluate board recursively
          let score = this._minimax(player, possibleBoard, depth + 1);
          bestScore = Math.min(bestScore, score);
        }
      });

      return bestScore;
    } else {
      //maximizing turn
      let bestScore = -Infinity;

      board.getCurrentState().forEach((positionValue, index) => {
        if (positionValue == 0) {
          //clone board
          let possibleBoard = new Gameboard();
          possibleBoard.setState(board.getCurrentState());
          possibleBoard.placeMark(index, decidingPlayer, true);
          let score = this._minimax(player, possibleBoard, depth + 1, false);
          bestScore = Math.max(bestScore, score);
        }
      });

      return bestScore;
    }
  }

  _renderToConsole(board) {
    let outputString = "";
    console.log("------------------");
    board.getCurrentState().forEach((position, index) => {
      outputString += position.toString();
      if ((index + 1) % 3 == 0) {
        console.log(outputString);
        outputString = "";
      }
    });
  }

  handleCellClick(clickIndex) {
    if (clickIndex != -1) {
      this.model.placeMark(clickIndex, this.currentPlayer.getMarker());
    }
  }
}

export { GameController };
