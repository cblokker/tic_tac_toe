/*
 * Class AI
 * This class is responsible for encapsulating all AI logic in calculating best
 * future moves based on a minimax algorithm. Code inspired from
 */
function AI(loserPlayer, winnerPlayer, game) {
  this.minPlayer = loserPlayer.symbol;
  this.maxPlayer = winnerPlayer.symbol;
  this.game = $.extend(true, {}, game); // make a copy of the current game object;
}

AI.prototype.gameBoard = function() {
  return this.game.board;
}

AI.prototype.isTie = function() {
  // var board = this.gameBoard();
  return this.game.isTie();

  // for (var i = 0; i < board.length; i++) {
  //   if (!board[i]) return false;
  // }
  // return true;
};

AI.prototype.setBoard = function(board) {
  this.game.board = board;
}

AI.prototype.setCell = function(elem, index) {
  this.game.board[index] = elem;
}

AI.prototype.makeMove = function(index, player, board) {
  this.setBoard(board.slice(0));

  if (this.gameBoard()[index] == null) {
    this.setCell(player, index);
    return true;
  } else {
    return false;
  }
};

AI.prototype.findOptimalMove = function() {
  var board = this.gameBoard();
  var bestMoveValue = -100;
  var move = 0;

  for (var i = 0; i < board.length; i++) {
    if (this.makeMove(i, this.maxPlayer, board)) {
      var predictedMoveValue = this.minValue();

      if (predictedMoveValue > bestMoveValue) {
        bestMoveValue = predictedMoveValue;
        move = i;
      }
    }
  }

  return move;
};

// Make independent of game class? Would make AI class more modular, but AI is 
// already dependent on some sort of game object
AI.prototype.isMinWinner = function() {
  return this.game.whoIsWinner(this.minPlayer);
}

AI.prototype.isMaxWinner = function() {
  return this.game.whoIsWinner(this.maxPlayer);
}

AI.prototype.minValue = function() {
  var board = this.gameBoard();

  if (this.isMaxWinner()) {
    return 1;
  } else if (this.isMinWinner()) {
    return -1;
  } else if (this.isTie()) { 
    return 0;
  } else {
    var bestMoveValue = 100;
    var move = 0;

    for (var i = 0; i < board.length; i++) {
      if (this.makeMove(i, this.minPlayer, board)) {
        var predictedMoveValue = this.maxValue();

        if (predictedMoveValue < bestMoveValue) {
          bestMoveValue = predictedMoveValue;
          move = i;
        }
      }
    }

    return bestMoveValue;
  }
};

AI.prototype.maxValue = function() {
  var board = this.gameBoard();

  if (this.isMaxWinner()) {
    return 1;
  } else if (this.isMinWinner()) {
    return -1;
  } else if (this.isTie()) {
    return 0;
  } else {
    var bestMoveValue = -100;
    var move = 0;

    for (var i = 0; i < board.length; i++) {
      if (this.makeMove(i, this.maxPlayer, board)) {
        var predictedMoveValue = this.minValue();

        if (predictedMoveValue > bestMoveValue) {
          bestMoveValue = predictedMoveValue;
          move = i;
        }
      }
    }

    return bestMoveValue;
  }
};
