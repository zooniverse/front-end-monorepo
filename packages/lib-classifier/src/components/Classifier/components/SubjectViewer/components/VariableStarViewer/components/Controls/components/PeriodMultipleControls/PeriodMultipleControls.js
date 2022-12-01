import React from 'react'
import PropTypes from 'prop-types'
import { FormField, RadioButtonGroup } from 'grommet'
import styled, { css } from 'styled-components'
import { SpacedText, withThemeContext } from '@zooniverse/react-components'
import theme from './theme'
import { useTranslation } from '@translations/i18n'

export const StyledRadioButtonGroup = styled(RadioButtonGroup)`
  label {
    flex-direction: column;
  }

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

export function PeriodMultipleControls (props) {
  const { periodMultiple, options, setPeriodMultiple, theme } = props
  const { t } = useTranslation('components')
  return (
    <FormField
      htmlFor='periodMultiple'
      label={<SpacedText size='10px' weight='bold'>{t('SubjectViewer.VariableStarViewer.periodMultiple')}</SpacedText>}
    >
      <StyledRadioButtonGroup
        color={theme.global.colors['light-6']}
        direction='row'
        gap='medium'
        id='periodMultiple'
        name='periodMultiple'
        onChange={event => setPeriodMultiple(event)}
        options={options}
        value={periodMultiple.toString()}
      />
    </FormField>
  )
}

PeriodMultipleControls.propTypes = {
  options: PropTypes.array.isRequired,
  periodMultiple: PropTypes.number.isRequired,
  setPeriodMultiple: PropTypes.func.isRequired,
  theme: PropTypes.object
}

PeriodMultipleControls.defaultProps = {
  theme: {
    global: {
      colors: {}
    }
  }
}

export default withThemeContext(PeriodMultipleControls, theme)
