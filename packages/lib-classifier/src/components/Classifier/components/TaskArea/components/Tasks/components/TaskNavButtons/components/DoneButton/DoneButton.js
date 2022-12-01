import { PrimaryButton } from '@zooniverse/react-components'
import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from '@translations/i18n'

// TODO add back gold standard and demo buttons using grommet Button icon prop
// {props.demoMode && <i className="fa fa-trash fa-fw" />}
// {props.goldStandardMode && <i className="fa fa-star fa-fw" />}
function DoneButton ({
  completed = false,
  disabled = false,
  hasNextStep = false,
  onClick = () => true
}) {
  const { t } = useTranslation('components')
  if (!hasNextStep) {
    return (
      <PrimaryButton
        color='green'
        disabled={disabled}
        label={t('TaskArea.Tasks.DoneButton.done')}
        onClick={onClick}
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
