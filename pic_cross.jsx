import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game';

const ReactPicCross = React.createClass({
  render() {
    return <Game />;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<ReactPicCross />, document.getElementById('main'));
});
