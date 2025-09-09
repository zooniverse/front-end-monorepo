import { PrimaryButton } from '@zooniverse/react-components'
import { bool, func } from 'prop-types'
import { useTranslation } from '@translations/i18n'
import styled from 'styled-components'

const DEFAULT_HANDLER = () => true

const StyledButton = styled(PrimaryButton)`
  flex: 1 0;
  padding: 10px;
  font-weight: bold; // intentionally bolder than Back, Next, Done & Talk labels
`

function DoneButton({
  disabled = false,
  onClick = DEFAULT_HANDLER,
  setSaving = DEFAULT_HANDLER
}) {
  const { t } = useTranslation('components')

  function handleClick(event) {
    setSaving(true)
    return onClick(event)
  }

  return (
    <StyledButton
      color='green'
      disabled={disabled}
      label={t('TaskArea.Tasks.DoneButton.done')}
      onClick={handleClick}
    />
  )
}

DoneButton.propTypes = {
  disabled: bool,
  onClick: func,
  setSaving: func
}

export default DoneButton
