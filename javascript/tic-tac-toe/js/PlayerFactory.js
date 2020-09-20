import { Player } from "./Player.js";

class PlayerFactory {
  static createHumanPlayer(userName, chosenMarker) {
    return new Player(userName, chosenMarker, true);
  }

  static createAIPlayer(userName, chosenMarker) {
    return new Player(userName, chosenMarker, false);
  }
}

export { PlayerFactory };
