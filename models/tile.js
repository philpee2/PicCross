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

  // Toggle the fill of this tile if it is not flagged, and return the resulting Change object
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

  // Toggle the flag of this tile if it is not filled, and return the resulting Change object
  toggleFlag() {
    if (this.filled) {
      return false;
    }
    this.toggleFlagDangerous();
    return new Change(true, this.pos);
  };
}

module.exports = Tile;
