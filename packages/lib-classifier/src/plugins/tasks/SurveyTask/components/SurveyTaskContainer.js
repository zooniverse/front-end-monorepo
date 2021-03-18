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
      selectedChoice: ''
    }
  }

  handleAnswers (answers) {
    this.setState({ answers })
  }

  handleChoice (selectedChoice) {
    this.setState({ selectedChoice })
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
    this.setState({ filters: newFilters })
  }

  handleIdentify() {
    const { annotation } = this.props
    const { answers, filters, selectedChoice } = this.state

    const parsedFilters = JSON.parse(JSON.stringify(filters))
    const value = annotation.value.filter(item => item.choice !== selectedChoice)
    value.push({ choice: selectedChoice, answers, filters: parsedFilters })

    this.handleAnswers({})
    this.handleChoice('')

    annotation.update(value)
  }

  render () {
    const {
      autoFocus,
      disabled,
      task
    } = this.props

    const {
      answers,
      filters,
      selectedChoice
    } = this.state

    return (
      <SurveyTask
        answers={answers}
        autoFocus={autoFocus}
        disabled={disabled}
        filters={filters}
        handleAnswers={this.handleAnswers.bind(this)}
        handleChoice={this.handleChoice.bind(this)}
        handleFilter={this.handleFilter.bind(this)}
        handleIdentify={this.handleIdentify.bind(this)}
        selectedChoice={selectedChoice}
        task={task}
      />
    )
  }
}

SurveyTaskContainer.defaultProps = {
  autoFocus: false,
  disabled: false
}

SurveyTaskContainer.propTypes = {
  autoFocus: PropTypes.bool,
  annotation: PropTypes.shape({
    update: PropTypes.func,
    value: PropTypes.array
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
