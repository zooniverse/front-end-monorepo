import { useState } from 'react'
import { PrimaryButton } from '@zooniverse/react-components'
import PropTypes from 'prop-types'
import { useTranslation } from '@translations/i18n'

const DEFAULT_HANDLER = () => true
function DoneAndTalkButton ({
  disabled = false,
  onClick = DEFAULT_HANDLER,
  visible = false
}) {
  const { t } = useTranslation('components')
  const [saving, setSaving] = useState(false)

  function handleClick(event) {
    setSaving(true)
    return onClick(event)
  }

  if (visible) {
    return (
      <PrimaryButton
        color='blue'
        disabled={disabled || saving}
        label={t('TaskArea.Tasks.DoneAndTalkButton.doneAndTalk')}
        onClick={handleClick}
        style={{ flex: '1 0', marginRight: '1ch', textTransform: 'capitalize' }}
      />
    )
  }
  return null
}

DoneAndTalkButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  visible: PropTypes.bool
}

export default DoneAndTalkButton
