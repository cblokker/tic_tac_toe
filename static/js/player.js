/*
 * Player class
 */
function Player(symbol, game) {
  this.symbol = symbol;
  this.game = game;
}

/*
 * Player Subclass for Human (non AI) players
 */
function HumanPlayer(symbol, game) {
  Player.call(this, symbol, game);
  this.ai = false;
}

HumanPlayer.prototype = new Player();

/*
 * Player Subclass for Computer (AI) players
 */
function ComputerPlayer(symbol, game) {
  Player.call(this, symbol, game);
  this.ai = true;
}

ComputerPlayer.prototype = new Player();