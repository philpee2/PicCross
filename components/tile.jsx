const React = require('react'),
  TileModel = require('../models/tile'),
  classnames = require('classnames');

const Tile = React.createClass({
  propTypes: {
    tile: React.PropTypes.instanceOf(TileModel).isRequired,
    updateGame: React.PropTypes.func.isRequired,
    highlight: React.PropTypes.bool.isRequired,
  },

  handleClick(e) {
    this.props.updateGame(this.props.tile, (e.altKey || e.metaKey || e.shiftKey) );
  },

  render() {
    const { tile, highlight } = this.props;

    const classNames = classnames('tile', {
      'filled': tile.filled,
      'flagged': tile.flagged,
      'fifth-column': highlight,
    });
    return (
      <div
        className={classNames}
        onClick={this.handleClick}
      >
      </div>
    );
  }
});

module.exports = Tile;
