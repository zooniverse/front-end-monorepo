import { Box, Drop } from 'grommet'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { useState, useRef } from 'react'

import Choice from './components/Choice'
import Chooser from './components/Chooser'

function SurveyTask (props) {
  const {
    autoFocus,
    disabled,
    task
  } = props

  const [selectedChoice, setSelectedChoice] = useState(false)

  function handleChoice (selectedChoiceId) {
    console.log('Selected choiceId =', selectedChoiceId)

    setSelectedChoice(selectedChoiceId)
  }

  const choiceTargetRef = useRef()

  return (
    <Box
      ref={choiceTargetRef}
    >
      <Chooser
        autoFocus={autoFocus}
        disabled={disabled}
        onChoose={handleChoice}
        task={task}
      />
      {choiceTargetRef.current && selectedChoice && (
        <Drop
          align={{
            top: 'top'
          }}
          onClickOutside={() => setSelectedChoice(false)}
          onEsc={() => setSelectedChoice(false)}
          stretch='align'
          target={choiceTargetRef.current}
        >
          <Choice
            choiceId={selectedChoice}
            onCancel={() => setSelectedChoice(false)}
            task={task}
          />
        </Drop>
      )}
    </Box>
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
