const { times, sample, isEqual } = require('lodash'),
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

  // Get the Tile object at a given position
  getTile(pos) {
    const [x, y] = pos;
    return this.grid[x][y];
  }

  // Create a random game solution for a given grid size. Each tile has a 50% chance of being
  // filled. The solution is represented as a 2D array where true represents a filled tile and
  // false represents an empty tile.
  randomSolution(gridSize) {
    return times(gridSize, () => {
      return times(gridSize, () => {
        return sample([true, false]);
      });
    });
  }

  // Create an empty 2D array of the given grid size, where every element is a Tile object that is
  // neither filled or flagged
  generateBoard(gridSize) {
    return times(gridSize, (i) => {
      return times(gridSize, (j) => {
        return new Tile(this, [i, j]);
      });
    });
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

  isChangeStackEmpty() {
    return this.changeStack.length === 0;
  }

  // Returns true if the board represents the solution
  won() {
    const filledState = this.grid.map((row) => {
      return row.map((tile) => tile.filled);
    });
    return isEqual(this.solution, filledState);
  }
}


module.exports = Board;
