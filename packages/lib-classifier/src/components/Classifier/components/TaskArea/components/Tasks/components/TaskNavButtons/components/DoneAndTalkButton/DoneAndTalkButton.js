import { PrimaryButton } from '@zooniverse/react-components'
import { bool, func } from 'prop-types'
import { useTranslation } from '@translations/i18n'
import { ShareRounded } from 'grommet-icons'
import { Text } from 'grommet'
import styled from 'styled-components'

const StyledLabel = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1ch;
`

const StyledButton = styled(PrimaryButton)`
  flex: 1 0;
`

const Label = () => {
  const { t } = useTranslation('components')
  return (
    <StyledLabel>
      {t('TaskArea.Tasks.DoneAndTalkButton.doneAndTalk')}
      <ShareRounded size='1rem' color='black' />
    </StyledLabel>
  )
}

const DEFAULT_HANDLER = () => true
function DoneAndTalkButton({
  disabled = false,
  onClick = DEFAULT_HANDLER,
  setSaving = DEFAULT_HANDLER,
  visible = false
}) {
  function handleClick(event) {
    setSaving(true)
    return onClick(event)
  }

  if (visible) {
    return (
      <StyledButton
        color='blue'
        disabled={disabled}
        label={<Label />}
        onClick={handleClick}
      />
    )
  }
  return null
}

DoneAndTalkButton.propTypes = {
  disabled: bool,
  onClick: func,
  setSaving: func,
  visible: bool
}

export default DoneAndTalkButton
