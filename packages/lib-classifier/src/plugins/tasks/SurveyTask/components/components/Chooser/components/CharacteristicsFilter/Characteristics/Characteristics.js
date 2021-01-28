import { Box, Button } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

import CharacteristicSection from './components/CharacteristicSection'

export default function Characteristics (props) {
  const {
    filters,
    onFilter,
    task
  } = props

  return (
    <Box
      fill='horizontal'
    >
      {task.characteristicsOrder.map((characteristicId, i) => {
        const characteristic = task.characteristics[characteristicId]
        const selectedValueId = filters[characteristicId]

        return (
          <CharacteristicSection
            key={characteristicId}
            characteristic={characteristic}
            characteristicId={characteristicId}
            images={task.images}
            onFilter={onFilter}
            selectedValueId={selectedValueId}
          />)
      })}
      <Button
        label="Clear filters"
        onClick={() => onFilter(undefined, undefined)}
      />
    </Box>
  )
}

Characteristics.propTypes = {
  filters: PropTypes.objectOf(PropTypes.string),
  onFilter: PropTypes.func,
  task: PropTypes.shape({
    help: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired
}
