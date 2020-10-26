import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'grommet'
import styled from 'styled-components'
import { PlainButton, SpacedText, withThemeContext } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import FlipIcon from '../FlipIcon'
import en from '../../locales/en'
import theme from './theme'
import HighlightSeriesCheckBoxes from './components/HighlightSeriesCheckBoxes'
import PhaseFocusControls from './components/PhaseFocusControls'
import PeriodMultipleControls from './components/PeriodMultipleControls'

counterpart.registerTranslations('en', en)

export const FlipButton = styled(PlainButton)`
  &:enabled:hover, &:focus {
    text-decoration: none;

    > div > svg > circle {
      fill: rgba(216,216,216,0.4);
    }
  }

  > div {
    flex-direction: column;
  }
`


function Controls(props) {
  const {
    data,
    gridArea,
    highlightedSeries,
    periodMultiple,
    periodMultipleOptions,
    phaseFocusedSeries,
    setSeriesHighlight,
    setSeriesPhaseFocus,
    setPeriodMultiple,
    setYAxisInversion,
  } = props

  const radioButtonOptions = periodMultipleOptions.map((option) => {
    return {
      label: <SpacedText size='10px' style={{ width: '1ch' }} weight='bold'>{option}</SpacedText>,
      value: option
    }
  })

  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      border={{ color: { light: 'light-3', dark: 'dark-3' }, size: 'xsmall' }}
      direction='row'
      justify='between'
      gridArea={gridArea}
      pad='xsmall'
    >
      <SpacedText
        style={{ fontSize: '0.5em', textAlign: 'center', transform: 'rotate(180deg)', writingMode: 'vertical-lr' }}
      >
        {counterpart('VariableStarViewer.controls')}
      </SpacedText>
      <FlipButton
        icon={<FlipIcon />}
        label={
          <SpacedText margin={{ top: '5px' }} size='10px' weight='bold'>
            {counterpart('VariableStarViewer.flip')}
          </SpacedText>
        }
        onClick={event => setYAxisInversion(event)}
        pad='small'
      />
      <PeriodMultipleControls
        options={radioButtonOptions}
        periodMultiple={periodMultiple}
        setPeriodMultiple={setPeriodMultiple}
      />
      <Box justify='between'>
        <PhaseFocusControls
          data={data}
          phaseFocusedSeries={phaseFocusedSeries}
          setSeriesPhaseFocus={setSeriesPhaseFocus}
        />
        <SpacedText size='10px' weight='bold'>
          {counterpart('VariableStarViewer.phaseFocus')}
        </SpacedText>
      </Box>
      <Box justify='between'>
        <HighlightSeriesCheckBoxes
          data={data}
          highlightedSeries={highlightedSeries}
          setSeriesHighlight={setSeriesHighlight}
        />
        <SpacedText size='10px' weight='bold'>
          {counterpart('VariableStarViewer.highlight')}
        </SpacedText>
      </Box>
    </Box>
  )
}

Controls.defaultProps = {
  data: [],
  gridArea: '',
  highlightedSeries: [],
  periodMultiple: 1,
  periodMultipleOptions: ['0.5', '1', '2', '3'],
  phaseFocusedSeries: 0,
  setSeriesHighlight: () => {},
  setPeriodMultiple: () => {},
  setYAxisInversion: () => {},
}

Controls.propTypes = {
  data: PropTypes.array,
  gridArea: PropTypes.string,
  highlightedSeries: PropTypes.arrayOf(PropTypes.object),
  periodMultiple: PropTypes.number,
  periodMultipleOptions: PropTypes.arrayOf(PropTypes.string),
  phaseFocusedSeries: PropTypes.number,
  setSeriesHighlight: PropTypes.func,
  setPeriodMultiple: PropTypes.func,
  setYAxisInversion: PropTypes.func,
}

export default withThemeContext(Controls, theme)