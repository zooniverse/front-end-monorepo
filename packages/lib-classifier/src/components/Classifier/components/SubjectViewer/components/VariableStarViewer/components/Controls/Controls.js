import React from 'react'
import {
  Button,
  Box,
  CheckBox,
  FormField,
  RadioButtonGroup
} from 'grommet'
import { SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import FlipIcon from '../FlipIcon'
import en from '../../locales/en'

counterpart.registerTranslations('en', en)

function Controls(props) {
  const {
    gridArea,
    periodMultiple,
    setSeriesFocus,
    setPeriodMultiple,
    setYAxisInversion
  } = props
  return (
    <Box direction='row' gridArea={gridArea}>
      <SpacedText>{counterpart('VariableStarLightCurveViewer.controls')}</SpacedText>
      <Button
        icon={<FlipIcon />}
        label={<SpacedText>{counterpart('VariableStarLightCurveViewer.flip')}</SpacedText>}
        onClick={event => setYAxisInversion(event)}
      />
      <fieldset>
        <FormField>
          <CheckBox
            name=''
            onChange={event => setSeriesFocus(event)}
          />
        </FormField>
        <FormField>
          <CheckBox
            name=''
            onChange={event => setSeriesFocus(event)}
          />
        </FormField>
      </fieldset>
      <FormField
        htmlFor='periodMultiple'
        label={<SpacedText>{'VariableStarLightCurveViewer.periodMultiple'}</SpacedText>}
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
    </Box>
  )
}

export default Controls