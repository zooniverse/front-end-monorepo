import { PrimaryButton } from '@zooniverse/react-components'
import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'

function DoneAndTalkButton ({
  disabled = false,
  onClick = () => {},
  visible = false
}) {
  const { t } = useTranslation('components')
  if (visible) {
    return (
      <PrimaryButton
        color='blue'
        disabled={disabled}
        label={t('TaskArea.Tasks.DoneAndTalkButton.doneAndTalk')}
        onClick={onClick}
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
