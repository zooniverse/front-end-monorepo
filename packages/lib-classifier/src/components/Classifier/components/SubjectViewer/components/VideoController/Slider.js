import React from 'react'
import PropTypes from 'prop-types'
import { Grommet, Box, RangeInput } from 'grommet'

const customThemeRangeInput = {
  global: {
    spacing: '16px'
  },
  rangeInput: {
    track: {
      color: 'accent-2',
      height: '6px',
      extend: () => `border-radius: 10px`,
      lower: {
        color: '#EFF2F5'
      },
      upper: {
        color: 'dark-4'
      }
    },
    thumb: {
      color: '#EFF2F5'
    }
  }
}

const Slider = ({ played, onMouseUp, onMouseDown, onChange }) => (
  <Grommet theme={customThemeRangeInput}>
    <Box a11yTitle='Video player slider'>
      <RangeInput
        min={0}
        max={1}
        step={0.0001}
        value={played}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onChange={onChange}
        onInput={onChange}
      />
    </Box>
  </Grommet>
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
