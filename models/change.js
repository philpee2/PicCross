class Change {

  constructor(isFlag, pos) {
    this.isFlag = isFlag;
    this.pos = pos;
  }

  undo(board) {
    const tile = board.getTile(this.pos);
    if (this.isFlag) {
      tile.toggleFlagDangerous();
    } else {
      tile.toggleFillDangerous();
    }
  }
}


module.exports = Change;
