import { PrimaryButton } from '@zooniverse/react-components'
import { bool, func, string } from 'prop-types'
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

function DoneAndTalkButton({
  disabled = false,
  onClick = DEFAULT_HANDLER,
  setSaving = DEFAULT_HANDLER,
  talkURL = ''
}) {
  function handleClick(event) {
    setSaving(true)
    return onClick(event)
  }

  return (
    <StyledButton
      color='blue'
      href={disabled ? '' : talkURL}
      label={<Label />}
      onClick={handleClick}
      disabled={disabled}
      target='_blank'
      onContextMenu={e => e.preventDefault()} // Done & Talk link should not be opened via right click + open in a new tab. We do not want volunteers to see Talk for a subject while still classifying.
    />
  )
}

DoneAndTalkButton.propTypes = {
  disabled: bool,
  onClick: func,
  setSaving: func,
  talkURL: string
}

export default DoneAndTalkButton
