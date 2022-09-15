import React from 'react'
import PropTypes from 'prop-types'
import { Grommet, Box, RangeInput } from 'grommet'
import { useTranslation } from 'react-i18next'

const customThemeRangeInput = {
  global: {
    spacing: '16px'
  },
  rangeInput: {
    track: {
      color: 'accent-1',
      height: '6px',
      extend: () => 'border-radius: 10px',
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

const Slider = ({
  timeStamp = 0,
  onMouseUp = () => true,
  onMouseDown = () => true,
  onChange = () => true
}) => {
  const { t } = useTranslation('components')
  return (
    <Grommet theme={customThemeRangeInput}>
      <Box>
        <RangeInput
          a11yTitle={t('SubjectViewer.VideoController.scrubber')}
          min={0}
          max={1}
          step={0.0001}
          value={timeStamp}
          onMouseUp={onMouseUp}
          onMouseDown={onMouseDown}
          onChange={onChange}
          onInput={onChange}
        />
      </Box>
    </Grommet>
  )
}

Slider.propTypes = {
  onMouseUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  onChange: PropTypes.func,
  played: PropTypes.number
}

export default Slider
