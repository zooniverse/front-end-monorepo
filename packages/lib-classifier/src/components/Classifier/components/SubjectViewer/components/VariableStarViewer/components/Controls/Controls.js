import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  FormField,
  RadioButtonGroup
} from 'grommet'
import styled, { css } from 'styled-components'
import { PlainButton, SpacedText, withThemeContext } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import FlipIcon from '../FlipIcon'
import en from '../../locales/en'
import theme from './theme'
import FocusSeriesCheckBoxes from './components/FocusSeriesCheckBoxes'

counterpart.registerTranslations('en', en)

export const FlipButton = styled(PlainButton)`
  &:enabled:hover, &:focus {
    text-decoration: none;

    > div > svg > circle {
      fill: rgba(216,216,216,0.4);
    }
  }
`

export const StyledRadioButtonGroup = styled(RadioButtonGroup)`
  > div {
    position: relative;
  }

  > div:after {
    ${props => css`border-bottom: 1px solid ${props.color};`}
    bottom: 0;
    content: '';
    height: 5px;
    left: 1px;
    position: absolute;
    right: 0;
    top: 0;
    width: 28px;
  }

  > div:first-of-type:after {
    left: -5px;
    width: 34px;
  }
`

function Controls(props) {
  const {
    data,
    focusedSeries,
    gridArea,
    periodMultiple,
    periodMultipleOptions,
    setSeriesFocus,
    setPeriodMultiple,
    setYAxisInversion,
    theme
  } = props

  const radioButtonOptions = periodMultipleOptions.map((option) => {
    return {
      label: <SpacedText size='10px' weight='bold'>{option}</SpacedText>,
      value: option
    }
  })

  return (
    <Box
      background='neutral-6'
      direction='row'
      gap='xsmall'
      gridArea={gridArea}
      pad='xsmall'
    >
      <SpacedText
        style={{ fontSize: '0.5em', transform: 'rotate(180deg)', writingMode: 'vertical-lr' }}
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
      <FormField
        htmlFor='periodMultiple'
        label={<SpacedText size='10px' weight='bold'>{counterpart('VariableStarViewer.periodMultiple')}</SpacedText>}
        style={{ position: 'relative' }}
      >
        <StyledRadioButtonGroup
          color={theme.global.colors['light-6']}
          direction='row'
          gap='medium'
          id='periodMultiple'
          name='periodMultiple'
          onChange={event => setPeriodMultiple(event)}
          options={radioButtonOptions}
          value={periodMultiple.toString()}
        />
      </FormField>
      <Box justify='between'>
        <FocusSeriesCheckBoxes
          data={data}
          focusedSeries={focusedSeries}
          setSeriesFocus={setSeriesFocus}
        />
        <SpacedText color='black' size='10px' weight='bold'>
          {counterpart('VariableStarViewer.focus')}
        </SpacedText>
      </Box>
    </Box>
  )
}

Controls.defaultProps = {
  data: [],
  focusedSeries: [],
  gridArea: '',
  periodMultiple: 1,
  periodMultipleOptions: ['0.5', '1', '2', '3'],
  setSeriesFocus: () => {},
  setPeriodMultiple: () => {},
  setYAxisInversion: () => {},
  theme: {
    global: {
      colors: {}
    }
  }
}

Controls.propTypes = {
  data: PropTypes.array,
  focusedSeries: PropTypes.arrayOf(PropTypes.object),
  gridArea: PropTypes.string,
  periodMultiple: PropTypes.number,
  setSeriesFocus: PropTypes.func,
  setPeriodMultiple: PropTypes.func,
  setYAxisInversion: PropTypes.func,
  theme: PropTypes.object
}

export default withThemeContext(Controls, theme)