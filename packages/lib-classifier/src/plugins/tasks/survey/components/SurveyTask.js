import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

import Choice from './components/Choice'
import Chooser from './components/Chooser'

function SurveyTask({
  answers = {},
  disabled = false,
  filters = {},
  handleAnswers = () => {},
  handleChoice = () => {},
  handleDelete = () => {},
  handleFilter = () => {},
  handleIdentify = () => {},
  selectedChoice = '',
  selectedChoiceIds = [],
  task
}) {
  return (
    <Box
      fill
    >
      {selectedChoice
        ? <Choice
            answers={answers}
            choiceId={selectedChoice}
            handleAnswers={handleAnswers}
            handleChoice={handleChoice}
            handleDelete={handleDelete}
            onIdentify={handleIdentify}
            task={task}
          />
        : <Chooser
            disabled={disabled}
            filters={filters}
            handleDelete={handleDelete}
            handleFilter={handleFilter}
            onChoose={handleChoice}
            selectedChoiceIds={selectedChoiceIds}
            task={task}
          />}
    </Box>
  )
}

SurveyTask.propTypes = {
  answers: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string
    ])
  ),
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
