const React = require('react'),
  ReactDOM = require('react-dom'),
  Game = require('./components/game');

const ReactPicCross = React.createClass({
  render() {
    return <Game />;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<ReactPicCross />, document.getElementById('main'));
});
