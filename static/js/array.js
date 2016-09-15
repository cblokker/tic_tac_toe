/*
 * Helper methods extending the Array class
 */
Array.prototype.includesEveryElement = function(array) {
  var array = array;
  return this.every(function(element) {
    return array.includes(element);
  })
};

Array.prototype.allSame = function() { // and not null
  var that = this
  return that.every(function(e) {
    return e && (e === that[0]);
  });
};