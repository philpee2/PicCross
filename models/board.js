const _ = require('lodash'),
  Hint = require('./hint'),
  Tile = require('./tile');

class Board {

  constructor(gridSize, solution) {
    this.gridSize = gridSize;
    this.grid = this.generateBoard(gridSize);
    this.solution = solution || this.randomSolution(gridSize);
    this.hint = new Hint(this.solution);
    this.changeStack = [];
  }

  getTile(pos) {
    return this.grid[pos[0]][pos[1]];
  }

  randomSolution(gridSize) {
    const solution = [];
    for (let i = 0; i < gridSize; i++) {
      solution.push([]);
      for (let j = 0; j < gridSize; j++) {
        solution[i].push(_.sample([true, false]))
      }
    }

    return solution;
  }

  generateBoard(gridSize) {
    const grid = [];
    for (let i = 0; i < gridSize; i++) {
      grid.push([]);
      for (let j = 0; j < gridSize; j++) {
        let tile = new Tile(this, [i, j]);
        grid[i].push(tile);
      }
    }
    return grid;
  }

  toggleFill(tile) {
    const change = tile.toggleFill();
    if (change) {
      this.changeStack.push(change);
    }
  }

  toggleFlag(tile) {
    const change = tile.toggleFlag();
    if (change) {
      this.changeStack.push(change);
    }
  }

  undo() {
    if (this.changeStack.length > 0) {
      const lastChange = this.changeStack.pop();
      lastChange.undo(this);
    }
  }

  isChangeStackEmpty() {
    return this.changeStack.length === 0;
  }

  won() {
    const filledState = this.grid.map((row) => {
      return row.map((tile) => tile.filled);
    });
    return _.isEqual(this.solution, filledState);
  }
}


module.exports = Board;
