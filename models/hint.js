function invert(grid) {
  const columns = new Array(grid.length);
  for (let k = 0; k < grid.length; k++) {
    columns[k] = new Array(grid.length);
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      columns[j][i] = grid[i][j];
    }
  }
  return columns;
}

class Hint {

  constructor(rows) {
    const columns = invert(rows);

    this.horizontal = rows.map((row) => Hint.countsForCells(row));
    this.vertical = columns.map((col) => Hint.countsForCells(col));
  };

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
