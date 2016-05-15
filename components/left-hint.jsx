import React, { PropTypes } from 'react';

function LeftHint({ hint }) {
  return (
    <div className="left-hint">
      {hint.map((h, i) => {
        return (
          <div className="left-hint-row" key={i}>
            {h.map((num, j) => {
              return <span className="left-hint-number" key={j}>{num}</span>
            })}
          </div>
        );
      })}
    </div>
  );
}

LeftHint.propTypes = {
  hint: PropTypes.array.isRequired,
};

export default LeftHint;
