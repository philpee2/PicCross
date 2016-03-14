var _ = require('lodash'),
  Hint = require('./hint'),
  Tile = require('./tile');

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

module.exports = Board;
