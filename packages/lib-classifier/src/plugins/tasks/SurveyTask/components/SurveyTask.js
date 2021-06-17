import { Stack } from 'grommet'
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
    handleDelete,
    handleFilter,
    handleIdentify,
    selectedChoice,
    selectedChoiceIds,
    task
  } = props

  function handleCancel () {
    handleAnswers({})
    handleChoice('')
  }

  return (
    <Stack fill>
      <Chooser
        autoFocus={autoFocus}
        disabled={disabled}
        filters={filters}
        handleFilter={handleFilter}
        onChoose={handleChoice}
        selectedChoiceIds={selectedChoiceIds}
        task={task}
      />
      {selectedChoice && (
        <Choice
          answers={answers}
          choiceId={selectedChoice}
          handleAnswers={handleAnswers}
          handleChoice={handleChoice}
          handleDelete={handleDelete}
          onIdentify={handleIdentify}
          task={task}
        />
      )}
    </Stack>
  )
}

SurveyTask.defaultProps = {
  answers: {},
  autoFocus: false,
  disabled: false,
  filters: {},
  handleAnswers: () => {},
  handleChoice: () => {},
  handleDelete: () => {},
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
  handleDelete: PropTypes.func,
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
