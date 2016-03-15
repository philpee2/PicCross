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

  // Create a random game solution for a given grid size. Each tile has a 50% chance of being
  // filled
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

  // Create an empty 2D array of the given grid size, where every element is an empty Tile object
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

  // Toggle fill for the given tile, and add the change to the change stack
  toggleFill(tile) {
    const change = tile.toggleFill();
    if (change) {
      this.changeStack.push(change);
    }
  }

  // Toggle flag for the given tile and add the change to the change stack
  toggleFlag(tile) {
    const change = tile.toggleFlag();
    if (change) {
      this.changeStack.push(change);
    }
  }

  // Undo the last change on the change stack
  undo() {
    if (this.changeStack.length > 0) {
      const lastChange = this.changeStack.pop();
      lastChange.undo(this);
    }
  }

  // Returns whether the stack of change is empty. The undo button should be disabled if the
  // stack is empty
  isChangeStackEmpty() {
    return this.changeStack.length === 0;
  }

  // Returns true if the board represents the solution
  won() {
    const filledState = this.grid.map((row) => {
      return row.map((tile) => tile.filled);
    });
    return _.isEqual(this.solution, filledState);
  }
}


module.exports = Board;
