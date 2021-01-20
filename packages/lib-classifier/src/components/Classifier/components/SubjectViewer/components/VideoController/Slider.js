import React from 'react'
import PropTypes from 'prop-types'
import { Grommet, Box, RangeInput } from 'grommet'
import counterpart from 'counterpart'
import en from './locales/en.json'

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
        color: '#F0B200'
      },
      upper: {
        color: 'dark-4'
      }
    },
    thumb: {
      color: '#F0B200'
    }
  }
}

counterpart.registerTranslations('en', en)

const Slider = ({ played, onMouseUp, onMouseDown, onChange }) => (
  <Grommet theme={customThemeRangeInput}>
    <Box>
      <RangeInput
        a11yTitle={counterpart('VideoController.scrubber')}
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
