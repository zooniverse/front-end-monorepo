import { Box, Button } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

import CharacteristicSection from './components/CharacteristicSection'

export default function Characteristics (props) {
  const { task } = props

  return (
    <Box
      fill
    >
      {task.characteristicsOrder.map((characteristicId, i) => {
        const characteristic = task.characteristics[characteristicId]

        return (
          <CharacteristicSection
            key={characteristicId}
            characteristic={characteristic}
            images={task.images}
          />)
      })}
      <Button
        label="Clear filters"
      />
    </Box>
  )
}

Characteristics.propTypes = {
  task: PropTypes.shape({
    help: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired
}
