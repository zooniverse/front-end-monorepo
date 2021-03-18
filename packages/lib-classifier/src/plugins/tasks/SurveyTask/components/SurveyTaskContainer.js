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
    
    console.log('answers', answers)
    console.log('filters', filters)
    console.log('selectedChoice', selectedChoice)

    return (
      <SurveyTask
        answers={answers}
        autoFocus={autoFocus}
        disabled={disabled}
        filters={filters}
        handleAnswers={this.handleAnswers.bind(this)}
        handleChoice={this.handleChoice.bind(this)}
        handleFilter={this.handleFilter.bind(this)}
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
