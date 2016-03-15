const { times } = require('lodash');

// Invert the given grid. This turns an array of rows into an array of columns
function invert(grid) {
  const columns = times(grid.length, () => new Array(grid.length));

  times(grid.length, (i) => {
    times(grid.length, (j) => {
      columns[j][i] = grid[i][j];
    });
  });
  return columns;
}

// A Hint represents the numbers shown to the player around the board.
class Hint {

  constructor(rows) {
    const columns = invert(rows);

    this.horizontal = rows.map((row) => Hint.countsForCells(row));
    this.vertical = columns.map((col) => Hint.countsForCells(col));
  };

  // For an array of booleans, return an array of the numbers representing it as a hint
  static countsForCells(cells) {
    const result = [];
    let currentSequence = 0;

    cells.forEach((cell) => {
      if (cell) {
        currentSequence++;
      } else {
        if (currentSequence > 0) {
          result.push(currentSequence);
          currentSequence = 0;
        }
      }
    });
    if (currentSequence > 0) {
      result.push(currentSequence);
    }

    if (result.length === 0) {
      result.push(0);
    }

    return result;
  }

}

module.exports = Hint;
