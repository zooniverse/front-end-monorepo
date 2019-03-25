import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const StyledInputStatus = styled.span`
  font-size: 0.8em;
  opacity: 0.7;
  text-align: right;
`;

// TODO Add Translations
export default function InputStatus({ count, tool }) {
  const minStyleColor = (count < tool.min) ? 'red' : '';
  const maxStyleColor = (count === tool.max) ? 'orange' : '';
  return (
    <StyledInputStatus>
      {count}{' '}
      {(!!tool.min || !!tool.max) &&
        'of '}
      {!!tool.min &&
        <span style={{ color: minStyleColor }}>{tool.min} required</span>}
      {!!tool.min && !!tool.max &&
        ', '}
      {!!tool.max &&
        <span style={{ color: maxStyleColor }}>{tool.max} maximum</span>}
      {' '}drawn
    </StyledInputStatus>
  );
}

InputStatus.defaultProps = {
  count: 0,
  tool: {}
};

InputStatus.propTypes = {
  count: PropTypes.number,
  tool: PropTypes.shape({
    min: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    max: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  })
};
