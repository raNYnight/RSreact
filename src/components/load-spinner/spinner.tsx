import React from 'react';

const Spinner = () => {
  return (
    <div className="spinner">
      <div>Loading...</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        style={{ background: 'none' }}
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#e15b64"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            dur="2s"
            repeatCount="indefinite"
            from="0"
            to="502"
          />
          <animate
            attributeName="stroke-dasharray"
            dur="2s"
            repeatCount="indefinite"
            values="150.6 100.4;1 250;150.6 100.4"
          />
        </circle>
      </svg>
    </div>
  );
};

export default Spinner;
