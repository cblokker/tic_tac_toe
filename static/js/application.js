$(function() {
  var game = new Game({}),
      $cell = $('.cell'),
      $restart = $('.restart-button');

  $cell.click(UIModule.clickCell(game));
  $restart.click(UIModule.restartClick(game));
});