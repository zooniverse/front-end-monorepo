import {
  Box
} from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import howManyColumns from './helpers/howManyColumns'
import whatSizeThumbnail from './helpers/whatSizeThumbnail'
import ChoiceButton from './components/ChoiceButton'

const StyledGrid = styled(Box)`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 2px;
  grid-template-rows: repeat(${props => props.rowsCount}, auto);
`

function Choices (props) {
  const {
    filteredChoiceIds,
    handleDelete,
    onChoose,
    selectedChoiceIds,
    task
  } = props

  const columnsCount = howManyColumns(filteredChoiceIds)
  const rowsCount = Math.ceil(filteredChoiceIds.length / columnsCount)
  const thumbnailSize = task.alwaysShowThumbnails ? 'small' : whatSizeThumbnail(filteredChoiceIds)

  function handleKeyDown (choiceId, event) {
    switch (event.key) {
      case 'Backspace': {
        event.preventDefault()
        event.stopPropagation()
        handleDelete(choiceId)
        return false
      }
      default: {
        return true
      }
    }
  }

  return (
    <StyledGrid
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      fill
      rowsCount={rowsCount}
    >
      {filteredChoiceIds.map((choiceId) => {
        const choice = task.choices?.[choiceId] || {}
        const selected = selectedChoiceIds.indexOf(choiceId) > -1
        const src = task.images?.[choice.images?.[0]] || ''
        return (
          <ChoiceButton
            key={choiceId}
            choiceId={choiceId}
            choiceLabel={choice.label}
            onChoose={onChoose}
            onKeyDown={handleKeyDown}
            selected={selected}
            src={src}
            thumbnailSize={thumbnailSize}
          />
        )
      })}
    </StyledGrid>
  )
}

Choices.defaultProps = {
  filteredChoiceIds: [],
  handleDelete: () => {},
  onChoose: () => {},
  selectedChoiceIds: []
}

Choices.propTypes = {
  filteredChoiceIds: PropTypes.arrayOf(
    PropTypes.string
  ),
  handleDelete: PropTypes.func,
  onChoose: PropTypes.func,
  selectedChoiceIds: PropTypes.arrayOf(PropTypes.string),
  task: PropTypes.shape({
    help: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired
}

export default Choices
