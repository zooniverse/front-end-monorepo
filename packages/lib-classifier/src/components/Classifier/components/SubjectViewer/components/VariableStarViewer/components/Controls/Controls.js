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
import VisibilitySeriesCheckBoxes from './components/VisibilitySeriesCheckBoxes'

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
`

function Controls(props) {
  const {
    data,
    visibleSeries,
    gridArea,
    periodMultiple,
    periodMultipleOptions,
    setSeriesVisibility,
    setPeriodMultiple,
    setYAxisInversion,
    theme
  } = props

  const radioButtonOptions = periodMultipleOptions.map((option) => {
    return {
      label: <SpacedText size='10px' style={{ width: '1ch' }} weight='bold'>{option}</SpacedText>,
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
        <VisibilitySeriesCheckBoxes
          data={data}
          visibleSeries={visibleSeries}
          setSeriesVisibility={setSeriesVisibility}
        />
        <SpacedText color='black' size='10px' weight='bold'>
          {counterpart('VariableStarViewer.visibility')}
        </SpacedText>
      </Box>
    </Box>
  )
}

Controls.defaultProps = {
  data: [],
  gridArea: '',
  periodMultiple: 1,
  periodMultipleOptions: ['0.5', '1', '2', '3'],
  setSeriesVisibility: () => {},
  setPeriodMultiple: () => {},
  setYAxisInversion: () => {},
  theme: {
    global: {
      colors: {}
    }
  },
  visibleSeries: []
}

Controls.propTypes = {
  data: PropTypes.array,
  gridArea: PropTypes.string,
  periodMultiple: PropTypes.number,
  setSeriesVisibility: PropTypes.func,
  setPeriodMultiple: PropTypes.func,
  setYAxisInversion: PropTypes.func,
  theme: PropTypes.object,
  visibleSeries: PropTypes.arrayOf(PropTypes.object)
}

export default withThemeContext(Controls, theme)