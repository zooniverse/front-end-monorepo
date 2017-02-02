import React from 'react';

let nextID = 0;

function generateNextID() {
  nextID += 1;
  return nextID;
}

const ZooniverseLogo = ({ width, height, title, style }) => {
  const logoID = generateNextID();
  return (
    <svg
      role="img"
      className="zooniverse-logo"
      viewBox="0 0 100 100"
      width={width}
      height={height}
      aria-labelledby={`zooniverse-logo_${logoID}`}
      style={style}
    >
      <title id={`zooniverse-logo_${logoID}`}>{title}</title>
      <g fill="currentColor" stroke="none" transform="translate(50, 50)">
        <path d="M 0 -45 A 45 45 0 0 1 0 45 A 45 45 0 0 1 0 -45 Z M 0 -30 A 30 30 0 0 0 0 30 A 30 30 0 0 0 0 -30 Z" />
        <path d="M 0 -14 A 14 14 0 0 1 0 14 A 14 14 0 0 1 0 -14 Z" />
        <ellipse cx="0" cy="0" rx="6" ry="65" transform="rotate(50)" />
      </g>
    </svg>
  );
};

const PropTypes = React.PropTypes;

ZooniverseLogo.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
};

ZooniverseLogo.defaultProps = {
  width: '1em',
  height: '1em',
  title: 'Zooniverse Logo',
  style: {},
};

export default ZooniverseLogo;
