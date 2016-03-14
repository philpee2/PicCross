const React = require('react'),
  Tile = require('./tile'),
  PicCross = require('../pic-cross'),
  classnames = require('classnames');

const Board = React.createClass({

  propTypes: {
    board: React.PropTypes.instanceOf(PicCross.Board).isRequired,
    updateGame: React.PropTypes.func.isRequired
  },

  tilesForRow(index) {
    return this.props.board.grid[index].map( (tile, j) => {
      return (
        <Tile
          tile={tile}
          updateGame={this.props.updateGame}
          key={j}
          highlight={j % 5 === 0 && j !== 0}
        />
      );
    });
  },

  render() {
    return (
      <div id="board">
        {this.props.board.grid.map( (row, i) => {
          return (
            <div className={classnames('grid-row', {'fifth-row': i % 5 === 0 && i !== 0})} key={i}>
              {this.tilesForRow(i)}
            </div>
          );
        })}
      </div>
    );
  }
});

module.exports = Board;
