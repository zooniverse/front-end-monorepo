import React from 'react'
import {
  Box,
  CheckBox,
  FormField,
  RadioButtonGroup
} from 'grommet'
import styled from 'styled-components'
import { PlainButton, SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import FlipIcon from '../FlipIcon'
import en from '../../locales/en'

counterpart.registerTranslations('en', en)

const StyledPlainButton = styled(PlainButton)`
  > div {
    flex-direction: column;
  }
`

const StyledFormField = styled(FormField)`
  flex-direction: column-reverse;
  margin: 0;
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
    <Box direction='row' gridArea={gridArea}>
      <SpacedText
        style={{ fontSize: '0.5em', transform: 'rotate(180deg)', writingMode: 'vertical-lr' }}
      >
        {counterpart('VariableStarViewer.controls')}
      </SpacedText>
      <StyledPlainButton
        icon={<FlipIcon />}
        label={<SpacedText size='xsmall'>{counterpart('VariableStarViewer.flip')}</SpacedText>}
        onClick={event => setYAxisInversion(event)}
        pad='small'
      />
      <fieldset style={{ border: 'none' }}>
        <FormField
          htmlFor='checkbox1'
        >
          <CheckBox
            id='checkbox1'
            name='focusCheckboxes'
            onChange={event => setSeriesFocus(event)}
          />
        </FormField>
        <FormField
          htmlFor='checkbox2'
        >
          <CheckBox
            id='checkbox2'
            name='focusCheckboxes'
            onChange={event => setSeriesFocus(event)}
          />
        </FormField>
      </fieldset>
      <StyledFormField
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
      </StyledFormField>
    </Box>
  )
}

export default Controls