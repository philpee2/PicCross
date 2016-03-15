const React = require('react');

function TopHint({ hint }) {
  return (
    <div className="top-hint">
      {hint.map((h, i) => {
        return (
          <div className="top-hint-row" key={i}>
            {h.map((num, j) => {
              return <div className="top-hint-number" key={j}>{num}</div>
            })}
          </div>
        );
      })}
    </div>
  );
};

TopHint.propTypes = {
  hint: React.PropTypes.array.isRequired,
};

module.exports = TopHint;
