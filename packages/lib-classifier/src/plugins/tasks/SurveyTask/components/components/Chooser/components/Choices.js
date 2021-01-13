import {
  Grid
} from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import sortIntoColumns from 'sort-into-columns'
import styled, { css } from 'styled-components'

import ChoiceButton from './ChoiceButton'

const StyledGrid = styled(Grid)`
  ${props => props.theme.dark ?
    css`background-color: ${props.theme.global.colors['dark-1']};` :
    css`background-color: ${props.theme.global.colors['light-1']};`
  }
`

function howManyColumns ({ length }) {
  if (length <= 5) {
    return 1
  } else if (length <= 20) {
    return 2
  } else {
    return 3
  }
}

function Choices (props) {
  const {
    filteredChoices,
    onChoose,
    task
  } = props

  const columnsCount = howManyColumns(filteredChoices)
  const sortedFilteredChoices = sortIntoColumns(filteredChoices, columnsCount)

  return (
    <StyledGrid
      columns={{
        count: columnsCount,
        size: 'auto'
      }}
      gap='2px'
    >
      {sortedFilteredChoices.map((choiceId) => {
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
    </StyledGrid>
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

export default Choices
