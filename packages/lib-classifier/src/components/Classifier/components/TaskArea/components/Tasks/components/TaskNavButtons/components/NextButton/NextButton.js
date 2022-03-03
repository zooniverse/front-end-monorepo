import { PrimaryButton, withThemeContext } from '@zooniverse/react-components'
import { bool } from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'

import nextButtonTheme from './theme'

function NextButton ({
  autoFocus = false,
  disabled = false,
  hasNextStep = false,
  onClick = () => true
}) {
  const { t } = useTranslation('components')
  const label = t('TaskArea.Tasks.NextButton.next')

  if (hasNextStep) {
    return (
      <PrimaryButton
        autoFocus={autoFocus}
        disabled={disabled}
        label={label}
        onClick={onClick}
        style={{ flex: '1 0' }}
      />
    )
  }

  return null
}

NextButton.propTypes = {
  autoFocus: bool,
  disabled: bool,
  hasNextStep: bool
}

export default withThemeContext(NextButton, nextButtonTheme)
export { NextButton }
