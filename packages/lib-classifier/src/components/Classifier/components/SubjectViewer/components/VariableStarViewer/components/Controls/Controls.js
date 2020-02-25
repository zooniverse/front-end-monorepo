import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  CheckBox,
  FormField,
  RadioButtonGroup
} from 'grommet'
import styled from 'styled-components'
import { PlainButton, SpacedText, withThemeContext } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import FlipIcon from '../FlipIcon'
import en from '../../locales/en'
import theme from './theme'

counterpart.registerTranslations('en', en)

export const FlipButton = styled(PlainButton)`
  > div {
    flex-direction: column;
  }
`

function Controls(props) {
  const {
    gridArea,
    periodMultiple,
    setSeriesFocus,
    setPeriodMultiple,
    setYAxisInversion
  } = props
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
        label={<SpacedText size='xsmall'>{counterpart('VariableStarViewer.periodMultiple')}</SpacedText>}
      >
        <RadioButtonGroup
          direction='row'
          gap='xsmall'
          id='periodMultiple'
          name='periodMultiple'
          onChange={event => setPeriodMultiple(event)}
          options={['0.5', '1', '2', '3']}
          value={periodMultiple.toString()}
        />
      </FormField>
      <Box>
        <fieldset style={{ border: 'none', padding: 0 }}>
          <label>
            <input type='checkbox' />
            <SpacedText style={{ fontSize: '0.5em' }}>red light</SpacedText>
          </label>
          <label>
            <input type='checkbox' />
            <SpacedText style={{ fontSize: '0.5em' }}>blue light</SpacedText>
          </label>
        </fieldset>
        <SpacedText size='xsmall'>
          {counterpart('VariableStarViewer.focus')}
        </SpacedText>
      </Box>
    </Box>
  )
}

Controls.defaultProps = {
  gridArea: '',
  periodMultiple: 1,
  setSeriesFocus: () => {},
  setPeriodMultiple: () => {},
  setYAxisInversion: () => {}
}

Controls.propTypes = {
  gridArea: PropTypes.string,
  periodMultiple: PropTypes.number,
  setSeriesFocus: PropTypes.func,
  setPeriodMultiple: PropTypes.func,
  setYAxisInversion: PropTypes.func
}

export default withThemeContext(Controls, theme)