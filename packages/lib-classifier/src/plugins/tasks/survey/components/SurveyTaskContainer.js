import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import SurveyTask from './SurveyTask'

class SurveyTaskContainer extends React.Component {
  constructor () {
    super()

    this.state = {
      answers: {},
      filters: {},
      previousChoice: '',
      selectedChoice: ''
    }

    this.handleAnswers = this.handleAnswers.bind(this)
    this.handleChoice = this.handleChoice.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
    this.handleIdentify = this.handleIdentify.bind(this)
  }

  componentDidUpdate (prevProps) {
    const { task } = this.props
    const prevTaskKey = prevProps.task?.taskKey
    const taskChanged = task && (task.taskKey !== prevTaskKey)

    if (taskChanged) {
      this.handleReset()
    }
  }

  componentWillUnmount () {
    const { annotation } = this.props

    if (annotation._choiceInProgress) {
      annotation.setChoiceInProgress(false)
    }
  }

  handleAnswers (answers) {
    this.setState({ answers })
  }

  handleChoice (selectedChoice) {
    const { annotation } = this.props
    
    // onCancel, onClickOutside, and onEsc selectedChoice defined as ''
    if (selectedChoice === '') {
      annotation.setChoiceInProgress(false)
    } else {
      annotation.setChoiceInProgress(true)
    }

    if (annotation?.value?.map(item => item.choice).includes(selectedChoice)) {
      const existingAnnotationValue = annotation?.value?.find(value => value.choice === selectedChoice)
      this.setState({
        selectedChoice,
        answers: existingAnnotationValue.answers
      })
    } else {
      this.setState({
        selectedChoice,
        answers: {}
      })
    }
  }

  handleDelete (deletedChoice) {
    const { annotation } = this.props
    
    if (annotation?.value?.map(item => item.choice).includes(deletedChoice)) {
      const value = annotation?.value?.filter(item => item.choice !== deletedChoice) || []
      annotation.update(value)
    }
    
    this.setState({
      answers: {},
      previousChoice: deletedChoice,
      selectedChoice: '',
    })

    annotation.setChoiceInProgress(false)
  }

  handleFilter (characteristicId, valueId) {
    let newFilters = Object.assign({}, this.state.filters)
    if (valueId) {
      newFilters[characteristicId] = valueId
    } else if (characteristicId) {
      delete newFilters[characteristicId]
    } else {
      newFilters = {}
    }

    this.setState({
      filters: newFilters,
    })
  }

  handleIdentify () {
    const { annotation } = this.props
    const { answers, filters, selectedChoice } = this.state

    const parsedFilters = JSON.parse(JSON.stringify(filters))
    const value = annotation?.value?.filter(item => item.choice !== selectedChoice) || []
    value.push({ choice: selectedChoice, answers, filters: parsedFilters })

    this.setState({
      answers: {},
      previousChoice: selectedChoice,
      selectedChoice: ''
    })

    annotation.update(value)
    annotation.setChoiceInProgress(false)
  }

  handleReset () {
    this.setState({
      answers: {},
      filters: {},
      previousChoice: '',
      selectedChoice: ''
    })
  }

  render () {
    const {
      annotation,
      disabled,
      task
    } = this.props

    const {
      answers,
      filters,
      previousChoice,
      selectedChoice
    } = this.state

    const selectedChoiceIds = annotation?.value?.map(item => item.choice)

    return (
      <SurveyTask
        answers={answers}
        disabled={disabled}
        filters={filters}
        previousChoice={previousChoice}
        handleAnswers={this.handleAnswers}
        handleChoice={this.handleChoice}
        handleDelete={this.handleDelete}
        handleFilter={this.handleFilter}
        handleIdentify={this.handleIdentify}
        selectedChoice={selectedChoice}
        selectedChoiceIds={selectedChoiceIds}
        task={task}
      />
    )
  }
}

SurveyTaskContainer.defaultProps = {
  disabled: false
}

SurveyTaskContainer.propTypes = {
  annotation: PropTypes.shape({
    setChoiceInProgress: PropTypes.func,
    update: PropTypes.func,
    value: PropTypes.array,
    _choiceInProgress: PropTypes.bool
  }).isRequired,
  disabled: PropTypes.bool,
  task: PropTypes.shape({
    help: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired
}

@observer
class DecoratedSurveyTaskContainer extends SurveyTaskContainer { }

export {
  DecoratedSurveyTaskContainer as default,
  SurveyTaskContainer
}
