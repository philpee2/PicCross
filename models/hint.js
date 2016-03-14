function invert(grid) {
  var columns = new Array(grid.length);
  for (var k = 0; k < grid.length; k++) {
    columns[k] = new Array(grid.length);
  }

  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid.length; j++) {
      columns[j][i] = grid[i][j];
    }
  }
  return columns;
}

var Hint = function(rows) {
  var columns = invert(rows);

  this.horizontal = rows.map(function(row) {
    return Hint.countsForCells(row);
  });
  this.vertical = columns.map(function(col) {
    return Hint.countsForCells(col);
  });
};

Hint.countsForCells = function(cells) {
  var result = [];
  var currentSequence = 0;

  cells.forEach(function(cell) {
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
    result = [0];
  }

  return result;
};

module.exports = Hint;
