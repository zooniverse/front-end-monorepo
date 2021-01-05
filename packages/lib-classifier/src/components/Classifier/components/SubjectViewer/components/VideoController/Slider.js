import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const SliderParent = styled.div`
  position: relative;
`

// const SliderInput = styled.input``

const Slider = ({ played, onMouseUp, onMouseDown, onChange }) => (
  <SliderParent>
    <input
      type='range'
      min={0}
      max={1}
      step='any'
      value={played}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      onChange={onChange}
      onInput={onChange}
    />
  </SliderParent>
)

Slider.propTypes = {
  className: PropTypes.string,
  onMouseUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  onChange: PropTypes.func,
  played: PropTypes.number
}
Slider.defaultProps = {
  className: '',
  onMouseUp: () => {},
  onMouseDown: () => {},
  onChange: () => {},
  played: 0
}

export default Slider
