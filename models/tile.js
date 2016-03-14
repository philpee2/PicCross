var Change = require('./change');

var Tile = function(board, pos) {
  this.board = board;
  this.pos = pos;
  this.filled = false;
  this.flagged = false;
};

Tile.prototype.toggleFillDangerous = function() {
  this.filled = !this.filled;
};

Tile.prototype.toggleFill = function () {
  if (this.flagged) {
    return false;
  }
  this.toggleFillDangerous();
  return new Change(false, this.pos);
};

Tile.prototype.toggleFlagDangerous = function() {
  this.flagged = !this.flagged;
}

Tile.prototype.toggleFlag = function () {
  if (this.filled) {
    return false;
  }
  this.toggleFlagDangerous();
  return new Change(true, this.pos);
};

module.exports = Tile;
