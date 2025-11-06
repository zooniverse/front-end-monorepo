import { PrimaryButton } from '@zooniverse/react-components'
import { bool, func } from 'prop-types'
import { useTranslation } from '@translations/i18n'
import styled from 'styled-components'

const DEFAULT_HANDLER = () => true

const StyledButton = styled(PrimaryButton)`
  flex: 1 0;
`

function NextButton({
  disabled = false,
  onClick = DEFAULT_HANDLER
}) {
  const { t } = useTranslation('components')
  const label = t('TaskArea.Tasks.NextButton.next')

  return (
    <StyledButton
      disabled={disabled}
      label={label}
      onClick={onClick}
    />
  )
}

NextButton.propTypes = {
  disabled: bool,
  onClick: func
}

export default NextButton
