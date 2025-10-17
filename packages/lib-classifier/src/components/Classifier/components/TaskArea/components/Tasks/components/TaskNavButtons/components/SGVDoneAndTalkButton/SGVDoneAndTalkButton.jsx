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
  gap: 5px;
`

const StyledButton = styled(PrimaryButton)`
  margin-right: 1ch;
  flex: 1 0;
  padding: 10px;
`

const Label = () => {
  const { t } = useTranslation('components')
  return (
    <StyledLabel>
      {t('TaskArea.Tasks.DoneAndTalkButton.doneAndTalk')}
      <ShareRounded
        size='0.825rem'
        color={{ light: 'black', dark: 'white' }}
        aria-label={t('TaskArea.Tasks.DoneAndTalkButton.newTab')}
      />
    </StyledLabel>
  )
}

const DEFAULT_HANDLER = () => true

function SGVDoneAndTalkButton({
  disabled = false,
  onClick = DEFAULT_HANDLER,
  setSaving = DEFAULT_HANDLER
}) {
  function handleClick(event) {
    event.preventDefault()
    setSaving(true)
    return onClick(event)
  }

  return (
    <StyledButton
      color='blue'
      label={<Label />}
      onClick={handleClick}
      disabled={disabled}
    />
  )
}

SGVDoneAndTalkButton.propTypes = {
  disabled: bool,
  onClick: func,
  setSaving: func
}

export default SGVDoneAndTalkButton