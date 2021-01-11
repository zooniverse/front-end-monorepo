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
  const { value } = task.annotation

  function updateAnnotation () {
    console.log('updateAnnotation')
  }

  return (
    <Chooser
      autoFocus={autoFocus}
      disabled={disabled}
      task={task}
      value={value}
      updateAnnotation={updateAnnotation}
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
