/*
 * Module that includes methods for click actions (UI logic + game logic)
 */
var UIModule = (function() {
  var $winner = $(".winner"),
      $cell = $(".cell");

  return {
    restartClick: function(game) {
      return function() {
        $winner.text("");
        $cell.text("");
        game.restartGame();
        $cell.bind("click", UIModule.clickCell(game)); // re-enables click on cell div
      }
    },

    clickCell: function(game) {
      return function() {
        var index = parseInt($(this)[0].id);
        if (game.board[index]) return;
        $(this).text(game.currentPlayerSymbol());
        game.move(index);
      }
    },

    win: function(game) {
      $winner.text(game.winningMessage());
      $cell.unbind("click");
    },

    tie: function(game) {
      $winner.text("Tied Game!");
      $cell.unbind("click");
    }
  }
})();