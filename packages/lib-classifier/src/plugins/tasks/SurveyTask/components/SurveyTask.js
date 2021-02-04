import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import Chooser from './components/Chooser'

function SurveyTask (props) {
  const {
    autoFocus,
    disabled,
    task
  } = props

  function handleChoice (selectedChoiceId) {
    console.log('Selected choiceId =', selectedChoiceId)
  }

  return (
    <Chooser
      autoFocus={autoFocus}
      disabled={disabled}
      task={task}
      onChoose={handleChoice}
    />
  )
}

SurveyTask.defaultProps = {
  autoFocus: false,
  disabled: false
}

SurveyTask.propTypes = {
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  task: PropTypes.shape({
    help: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired
}

export default observer(SurveyTask)
