import {
  Box
} from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

import ChoiceButton from './ChoiceButton'

export default function Choices (props) {
  const {
    filteredChoices,
    onChoose,
    task
  } = props

  return (
    <Box
      basis='medium'
      direction='column'
      wrap
    >
      {filteredChoices.map((choiceId) => {
        const choice = task.choices[choiceId]
        return (
          <ChoiceButton
            key={choiceId}
            choiceId={choiceId}
            choiceLabel={choice.label}
            onChoose={onChoose}
          />
        )
      })}
    </Box>
  )
}

Choices.defaultProps = {
  filteredChoices: [],
  onChoose: () => {}
}

Choices.propTypes = {
  filteredChoices: PropTypes.arrayOf(
    PropTypes.string
  ),
  onChoose: PropTypes.func,
  task: PropTypes.shape({
    help: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired
}
