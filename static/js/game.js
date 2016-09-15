/*
 * Game class
 */
function Game(params) {
  this.WINNING_POSITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
  ];
  this.playerOneTurn = true;
  this.moves = 0;
  this.winner = null;
  this.board = this.defaultBoard();
  this.playerOne = new HumanPlayer('X', this.board);
  this.playerTwo = new ComputerPlayer('O', this.board);
}

Game.prototype.move = function(index) {
  if (this.board[index]) return;

  this.board[index] = this.currentPlayerSymbol();
  this.moves++;

  if (this.isWinner()) {
    UIModule.win(this);
    return;
  } else if (this.isTie()) {
    UIModule.tie(this);
    return;
  }

  this.updateCurrentPlayer();

  if (this.currentPlayer().ai) {
    index = new AI(this.playerOne, this.playerTwo, this).findOptimalMove();
    var cell = $("#" + index);
    cell.trigger("click"); // AI simulates a click
  }
}


Game.prototype.winningMessage = function() {
  return this.currentPlayerSymbol() + " is the winner!"
}


Game.prototype.currentPlayerSymbol = function() {
  return this.currentPlayer().symbol;
};


Game.prototype.currentPlayer = function() {
  return this.playerOneTurn ? this.playerOne : this.playerTwo;
};


Game.prototype.updateCurrentPlayer = function() {
  return this.playerOneTurn = !this.playerOneTurn;
}


Game.prototype.defaultBoard = function() {
  return [null, null, null, null, null, null, null, null, null];
};


Game.prototype.isWinner = function() {
  var positions = this.WINNING_POSITIONS;
  var that = this;
  for (var i = 0; i < positions.length; i++) {
    if (that.winningPositionValues(positions[i]).allSame()) {
      return true;
    }
  }
  return false;
};


Game.prototype.winningPositionValues = function(position) {
  var that = this;

  return position.map(function(i) {
    return that.board[i];
  })
};


Game.prototype.isTie = function() {
  return this.board.every(function(cell) { return cell !== null }) && !this.isWinner()
}


Game.prototype.whoIsWinner = function(playerSymbol) {
  var that = this;
  var positions = this.WINNING_POSITIONS
  for (var i = 0; i < positions.length; i++) {
    var winningPositionValues = that.winningPositionValues(positions[i])
    if (winningPositionValues.every(function(p) { return p == playerSymbol })) return true;
  }
  return false
}


Game.prototype.restartGame = function() {
  this.playerOneTurn = true;
  this.moves = 0;
  this.winner = null;
  this.board = this.defaultBoard();
}