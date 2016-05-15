import React from 'react';
import Board from './board';
import TopHint from './top-hint';
import LeftHint from './left-hint';
import BoardModel from '../models/board';

const Game = React.createClass({
  getInitialState() {
    const initialBoardSize = 10;
    const board = this.newBoard(initialBoardSize);
    return {
      board: board,
      boardSize: initialBoardSize,
    };
  },

  newBoard(boardSize = this.state.boardSize) {
    return new BoardModel(boardSize);
  },

  updateBoardSize(e) {
    const newSize = Number(e.target.value);
    this.setState({boardSize: newSize});
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
        {/* So so not proud of this */}
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

        <div className="controls">
          <button
            className="btn btn-success"
            onClick={this.undo}
            disabled={board.isChangeStackEmpty()}
          >
            Undo
          </button>

          <button
            className="btn btn-success"
            onClick={this.reset}
          >
            New board
          </button>

          <div className="board-size-config">
            <div><strong>Board size</strong></div>
            <input
              type="number"
              value={this.state.boardSize}
              onChange={this.updateBoardSize}
            />
            <span> This will take effect when the next game starts</span>
          </div>
        </div>
      </div>
    );
  }
});

export default Game;
