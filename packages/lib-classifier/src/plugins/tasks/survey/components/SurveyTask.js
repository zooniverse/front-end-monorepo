import { Box } from 'grommet'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react';

import Choice from './components/Choice'
import Chooser from './components/Chooser'

export function SurveyTask ({
  annotation,
  task,
  disabled = false,
}) {
  const [answers, setAnswers] = useState({})
  const [filters, setFilters] = useState({})
  const [previousChoice, setPreviousChoice] = useState('')
  const [selectedChoice, setSelectedChoice] = useState('')

  useEffect(() => {
    return () => {
      if (annotation._choiceInProgress) {
        annotation.setChoiceInProgress(false)
      }
    }
  }, [task])

  function handleAnswers (answers) {
    setAnswers(answers)
  }

  function handleChoice (selectedChoice) {
    if (selectedChoice === '') {
      annotation.setChoiceInProgress(false)
    } else {
      annotation.setChoiceInProgress(true)
    }

    if (annotation?.value?.map(item => item.choice).includes(selectedChoice)) {
      const existingAnnotationValue = annotation?.value?.find(value => value.choice === selectedChoice)
      setAnswers(existingAnnotationValue.answers)
      setSelectedChoice(selectedChoice)
    } else {
      setAnswers({})
      setSelectedChoice(selectedChoice)
    }
  }

  function handleDelete (deletedChoice) {
    if (annotation?.value?.map(item => item.choice).includes(deletedChoice)) {
      const value = annotation?.value?.filter(item => item.choice !== deletedChoice) || []
      annotation.update(value)
    }
    
    setAnswers({})
    setPreviousChoice(deletedChoice)
    setSelectedChoice('')
    
    annotation.setChoiceInProgress(false)
  }

  function handleFilter (characteristicId, valueId) {
    let newFilters = Object.assign({}, filters)
    if (valueId) {
      newFilters[characteristicId] = valueId
    } else if (characteristicId) {
      delete newFilters[characteristicId]
    } else {
      newFilters = {}
    }

    setFilters(newFilters)
  }

  function handleIdentify () {
    const value = annotation?.value?.filter(item => item.choice !== selectedChoice) || []
    value.push({ choice: selectedChoice, answers, filters })

    setAnswers({})
    setSelectedChoice('')
    setPreviousChoice(selectedChoice)

    annotation.update(value)
    annotation.setChoiceInProgress(false)
  }

  const selectedChoiceIds = annotation?.value?.map(item => item.choice)

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
            previousChoiceId={previousChoice}
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
  /** required, the current survey task annotation */
  annotation: PropTypes.shape({
    setChoiceInProgress: PropTypes.func,
    update: PropTypes.func,
    value: PropTypes.array,
    _choiceInProgress: PropTypes.bool
  }).isRequired,
  /** will disable the task per subjectReadyState */
  disabled: PropTypes.bool,
  /** required, the current survey task */
  task: PropTypes.shape({
    help: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired
}

export default observer(SurveyTask)
