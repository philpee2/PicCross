// A Change represents a single action taken by the user. This can be toggling the fill or flag of
// a single tile. Storing these Change objects allows for the undo functionality
class Change {

  constructor(isFlag, pos) {
    this.isFlag = isFlag;
    this.pos = pos;
  }

  // Undo this change
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
