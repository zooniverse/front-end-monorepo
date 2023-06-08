import { useState } from 'react'
import { PrimaryButton } from '@zooniverse/react-components'
import PropTypes from 'prop-types'
import { useTranslation } from '@translations/i18n'

const DEFAULT_HANDLER = () => true
// TODO add back gold standard and demo buttons using grommet Button icon prop
// {props.demoMode && <i className="fa fa-trash fa-fw" />}
// {props.goldStandardMode && <i className="fa fa-star fa-fw" />}
function DoneButton ({
  completed = false,
  disabled = false,
  hasNextStep = false,
  onClick = DEFAULT_HANDLER
}) {
  const { t } = useTranslation('components')
  const [saving, setSaving] = useState(false)

  function handleClick(event) {
    setSaving(true)
    return onClick(event)
  }

  if (!hasNextStep) {
    return (
      <PrimaryButton
        color='green'
        disabled={disabled || saving}
        label={t('TaskArea.Tasks.DoneButton.done')}
        onClick={handleClick}
        style={{ flex: '1 0', textTransform: 'capitalize' }}
      />
    )
  }

  return null
}

DoneButton.propTypes = {
  completed: PropTypes.bool,
  demoMode: PropTypes.bool,
  disabled: PropTypes.bool,
  hasNextStep: PropTypes.bool,
  onClick: PropTypes.func
}

export default DoneButton
