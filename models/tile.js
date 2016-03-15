const Change = require('./change');

class Tile {

  constructor(board, pos) {
    this.board = board;
    this.pos = pos;
    this.filled = false;
    this.flagged = false;
  }

  toggleFillDangerous() {
    this.filled = !this.filled;
  }

  toggleFill() {
    if (this.flagged) {
      return false;
    }
    this.toggleFillDangerous();
    return new Change(false, this.pos);
  }

  toggleFlagDangerous() {
    this.flagged = !this.flagged;
  }

  toggleFlag() {
    if (this.filled) {
      return false;
    }
    this.toggleFlagDangerous();
    return new Change(true, this.pos);
  };
}

module.exports = Tile;
