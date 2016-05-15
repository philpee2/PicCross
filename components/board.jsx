import React from 'react';
import Tile from './tile';
import BoardModel from '../models/board';
import classnames from 'classnames';

const Board = React.createClass({

  propTypes: {
    board: React.PropTypes.instanceOf(BoardModel).isRequired,
    updateGame: React.PropTypes.func.isRequired
  },

  tilesForRow(index) {
    return this.props.board.grid[index].map( (tile, j) => {
      return (
        <Tile
          tile={tile}
          updateGame={this.props.updateGame}
          key={j}
          highlight={this.isFifth(j)}
        />
      );
    });
  },

  isFifth(index) {
    return (index % 5 === 0) && (index !== 0);
  },

  render() {
    return (
      <div id="board">
        {this.props.board.grid.map( (row, i) => {
          return (
            <div
              className={classnames('grid-row', {'fifth-row': this.isFifth(i)})}
              key={i}
            >
              {this.tilesForRow(i)}
            </div>
          );
        })}
      </div>
    );
  }
});

export default Board;
