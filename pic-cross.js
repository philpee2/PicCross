var _ = require('lodash');

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

var Board = function (gridSize, solution) {
  this.gridSize = gridSize;
  this.grid = this.generateBoard(gridSize);
  this.solution = solution || this.randomSolution(gridSize);
  this.hint = new Hint(this.solution);
  this.changeStack = [];
};

Board.prototype.getTile = function(pos) {
  return this.grid[pos[0]][pos[1]];
};

Board.prototype.randomSolution = function(gridSize) {
  var solution = [];
  for (var i = 0; i < gridSize; i++) {
    solution.push([]);
    for (var j = 0; j < gridSize; j++) {
      solution[i].push(_.sample([true, false]))
    }
  }

  return solution;
};

Board.prototype.generateBoard = function (gridSize) {
  var grid = [];
  for (var i = 0; i < gridSize; i++) {
    grid.push([]);
    for (var j = 0; j < gridSize; j++) {
      var tile = new Tile(this, [i, j]);
      grid[i].push(tile);
    }
  }
  return grid;
};

Board.prototype.toggleFill = function(tile) {
  var change = tile.toggleFill();
  if (change) {
    this.changeStack.push(change);
  }
}

Board.prototype.toggleFlag = function(tile) {
  var change = tile.toggleFlag();
  if (change) {
    this.changeStack.push(change);
  }
}

Board.prototype.undo = function() {
  if (this.changeStack.length > 0) {
    var lastChange = this.changeStack.pop();
    lastChange.undo(this);
  }
};

Board.prototype.isChangeStackEmpty = function() {
  return this.changeStack.length === 0;
};

Board.prototype.won = function () {

  var filledState = this.grid.map(function(row) {
    return row.map(function(tile) {
      return tile.filled;
    });
  });
  return _.isEqual(this.solution, filledState);
};

module.exports = {
  Board: Board,
  Tile: Tile
};
