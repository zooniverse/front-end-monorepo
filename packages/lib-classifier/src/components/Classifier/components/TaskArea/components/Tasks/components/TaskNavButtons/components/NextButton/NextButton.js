import { PrimaryButton } from '@zooniverse/react-components'
import withThemeContext from '@zooniverse/react-components/helpers/withThemeContext'
import { bool } from 'prop-types'
import { useTranslation } from '@translations/i18n'
import styled from 'styled-components'

import nextButtonTheme from './theme'

const DEFAULT_HANDLER = () => true

const StyledButton = styled(PrimaryButton)`
  flex: 1 0;
`

function NextButton ({
  autoFocus = false,
  disabled = false,
  hasNextStep = false,
  onClick = DEFAULT_HANDLER
}) {
  const { t } = useTranslation('components')
  const label = t('TaskArea.Tasks.NextButton.next')

  if (hasNextStep) {
    return (
      <StyledButton
        autoFocus={autoFocus}
        disabled={disabled}
        label={label}
        onClick={onClick}
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
