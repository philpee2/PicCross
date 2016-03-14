const React = require('react');

const TopHint = React.createClass({
  propTypes: {
    hint: React.PropTypes.array.isRequired,
  },

  render() {
    return (
      <div className="top-hint">
        {this.props.hint.map((hint, i) => {
          return (
            <div className="top-hint-row" key={i}>
              {hint.map((num, j) => {
                return <div className="top-hint-number" key={j}>{num}</div>
              })}
            </div>
          );
        })}
      </div>
    );
  }
});

module.exports = TopHint;
