const React = require('react'),
  Board = require('./board'),
  TopHint = require('./top-hint'),
  LeftHint = require('./left-hint'),
  BoardModel = require('../models/board');

const Game = React.createClass({
  getInitialState() {
    const board = this.newBoard();
    return {
      board: board
    };
  },

  newBoard() {
    return new BoardModel(5);
  },

  updateGame(tile, isFlagging) {
    const board = this.state.board;
    if (isFlagging) {
      board.toggleFlag(tile);
    } else {
      board.toggleFill(tile);
    }
    this.setState({ board: board });
  },

  componentDidUpdate() {
    if (this.state.board.won()) {
      alert('You win!');
      this.reset();
    }
  },

  reset() {
    const board = this.newBoard();
    this.setState({ board: board });
  },

  undo() {
    const board = this.state.board;
    board.undo();
    this.setState({ board: board });
  },

  render() {
    const board = this.state.board;
    return (
      <div>
        <table>
          <thead></thead>

          <tbody>
            <tr>
              <td></td>
              <td><TopHint hint={board.hint.vertical} /></td>
            </tr>

            <tr>
              <td><LeftHint hint={board.hint.horizontal} /></td>
              <td>
                <Board
                  board={board}
                  updateGame={this.updateGame}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className="btn btn-success"
          onClick={this.undo}
          disabled={board.isChangeStackEmpty()}
        >
          Undo
        </button>
      </div>
    );
  }
});

module.exports = Game;
