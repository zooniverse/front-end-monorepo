import {
  Box,
  Grid
} from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import sortIntoColumns from 'sort-into-columns'
import howManyColumns from './helpers/howManyColumns'
import whatSizeThumbnail from './helpers/whatSizeThumbnail'
import ChoiceButton from './components/ChoiceButton'

function Choices (props) {
  const {
    filteredChoices,
    onChoose,
    task
  } = props

  const columnsCount = howManyColumns(filteredChoices)
  const sortedFilteredChoices = sortIntoColumns(filteredChoices, columnsCount)
  const thumbnailSize = task.alwaysShowThumbnails ? 'small' : whatSizeThumbnail(filteredChoices)

  return (
    // Could possibly drop box by styling gap color? Is that possible? Or using border on button?
    <Box
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
    >
      <Grid
        columns={{
          count: columnsCount,
          size: 'auto'
        }}
        fill
        gap='2px'
      >
        {sortedFilteredChoices.map((choiceId) => {
          const choice = task.choices?.[choiceId] || {}
          const src = task.images?.[choice.images?.[0]] || ''
          return (
            <ChoiceButton
              key={choiceId}
              choiceId={choiceId}
              choiceLabel={choice.label}
              onChoose={onChoose}
              src={src}
              thumbnailSize={thumbnailSize}
            />
          )
        })}
      </Grid>
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

export default Choices
