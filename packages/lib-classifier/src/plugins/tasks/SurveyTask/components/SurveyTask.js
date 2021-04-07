import { Box, Drop } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

import Choice from './components/Choice'
import Chooser from './components/Chooser'

function SurveyTask (props) {
  const {
    answers,
    autoFocus,
    disabled,
    filters,
    handleAnswers,
    handleChoice,
    handleFilter,
    handleIdentify,
    selectedChoice,
    selectedChoiceIds,
    task
  } = props

  const choiceTargetRef = React.useRef()

  function handleCancel () {
    handleAnswers({})
    handleChoice('')
  }

  return (
    <Box
      ref={choiceTargetRef}
    >
      <Chooser
        autoFocus={autoFocus}
        disabled={disabled}
        filters={filters}
        handleFilter={handleFilter}
        onChoose={handleChoice}
        selectedChoiceIds={selectedChoiceIds}
        task={task}
      />
      {choiceTargetRef.current && selectedChoice && (
        <Drop
          align={{
            top: 'top'
          }}
          onClickOutside={() => handleCancel()}
          onEsc={() => handleCancel()}
          stretch='align'
          target={choiceTargetRef.current}
        >
          <Choice
            answers={answers}
            choiceId={selectedChoice}
            handleAnswers={handleAnswers}
            onCancel={() => handleCancel()}
            onIdentify={handleIdentify}
            task={task}
          />
        </Drop>
      )}
    </Box>
  )
}

SurveyTask.defaultProps = {
  answers: {},
  autoFocus: false,
  disabled: false,
  filters: {},
  handleAnswers: () => {},
  handleChoice: () => {},
  handleFilter: () => {},
  handleIdentify: () => {},
  selectedChoice: '',
  selectedChoiceIds: []
}

SurveyTask.propTypes = {
  answers: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string
    ])
  ),
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  filters: PropTypes.objectOf(PropTypes.string),
  handleAnswers: PropTypes.func,
  handleChoice: PropTypes.func,
  handleFilter: PropTypes.func,
  handleIdentify: PropTypes.func,
  selectedChoice: PropTypes.string,
  selectedChoiceIds: PropTypes.arrayOf(PropTypes.string),
  task: PropTypes.shape({
    help: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired
}

export default SurveyTask
