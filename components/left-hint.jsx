const React = require('react');

const LeftHint = React.createClass({
  propTypes: {
    hint: React.PropTypes.array.isRequired,
  },

  render() {
    return (
      <div className="left-hint">
        {this.props.hint.map((hint, i) => {
          return (
            <div className="left-hint-row" key={i}>
              {hint.map((num, j) => {
                return <span className="left-hint-number" key={j}>{num}</span>
              })}
            </div>
          );
        })}
      </div>
    );
  }
});

module.exports = LeftHint;
