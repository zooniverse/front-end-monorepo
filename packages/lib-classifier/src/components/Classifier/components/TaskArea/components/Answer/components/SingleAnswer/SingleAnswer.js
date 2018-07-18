import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import AnswerButton from '../AnswerButton'

function storeMapper (stores) {
  const { answers } = stores.classifierStore.tasks.active
  const { active: annotation } = stores.classifierStore.classification
  return {
    answers,
    annotation
  }
}

@inject(storeMapper)
@observer
class SingleAnswer extends React.Component {
  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (answer) {
    this.props.annotation.setValue(answer)
  }

  render () {
    const { annotation } = this.props
    return (
      <React.Fragment>
        {this.props.answers.map(answer =>
          <AnswerButton
            active={answer.label === annotation.answer}
            key={answer.label}
            onButtonClick={this.handleClick}
            {...answer}
          />
        )}
      </React.Fragment>
    )
  }
}

SingleAnswer.propTypes = {
  annotation: PropTypes.shape({
    answer: PropTypes.string,
    setValue: PropTypes.func
  }),
  answers: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string
  }))
}

SingleAnswer.defaultProps = {
  answers: [],
  annotation: {}
}

export default SingleAnswer
