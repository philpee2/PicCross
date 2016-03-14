var Change = function(isFlag, pos) {
  this.isFlag = isFlag;
  this.pos = pos;
};

Change.prototype.undo = function(board) {
  var tile = board.getTile(this.pos);
  if (this.isFlag) {
    tile.toggleFlagDangerous();
  } else {
    tile.toggleFillDangerous();
  }
};

module.exports = Change;
