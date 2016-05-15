import React, { PropTypes } from 'react';
import TileModel from '../models/tile';
import classnames from 'classnames';

const propTypes = {
  tile: PropTypes.instanceOf(TileModel).isRequired,
  updateGame: PropTypes.func.isRequired,
  highlight: PropTypes.bool.isRequired,
};

export default class Tile extends React.Component {

  handleClick(e) {
    this.props.updateGame(this.props.tile, (e.altKey || e.metaKey || e.shiftKey) );
  }

  render() {
    const { tile, highlight } = this.props;

    const classNames = classnames('tile', {
      'filled': tile.filled,
      'flagged glyphicon glyphicon-remove': tile.flagged,
      'fifth-column': highlight,
    });
    return (
      <div
        className={classNames}
        onClick={this.handleClick.bind(this)}
      >
        &nbsp;
      </div>
    );
  }
}

Tile.propTypes = propTypes;

export default Tile;
