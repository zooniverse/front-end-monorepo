import { Box, DropButton } from 'grommet'
import { Filter } from 'grommet-icons'
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'

import Characteristics from '../Characteristics'
import FilterButton from '../Characteristics/components/FilterButton'

export default function FilterStatus (props) {
  const { task } = props
  const filterStatusRef = useRef()

  // TODO: refactor filter state to model
  const [ filters, setFilters ] = useState({})

  function handleFilter (characteristicId, valueId) {
    // TODO ported from PFE, investigate why
    setTimeout(() => {
      const newFilters = Object.assign({}, filters)
      if (valueId) {
        newFilters[characteristicId] = valueId
      } else {
        delete newFilters[characteristicId]
      }
      setFilters(newFilters)
    })
  }

  const selectedCharacteristicIds = Object.keys(filters)

  return (
    <Box
      ref={filterStatusRef}
      align='center'
      direction='row'
      fill='horizontal'
    >
      <DropButton
        icon={<Filter />}
        label='Filter'
        dropAlign={{
          left: 'left',
          top: 'bottom'
        }}
        dropContent={
          <Characteristics
            filters={filters}
            onFilter={handleFilter}
            task={task}
          />}
        dropProps={{
          elevation: 'medium',
          stretch: 'align'
        }}
        dropTarget={filterStatusRef.current}
      />
      {selectedCharacteristicIds.map(characteristicId => {
        const characteristic = task.characteristics[characteristicId]
        const selectedValueId = filters[characteristicId]
        const value = characteristic.values[selectedValueId]
        const valueImageSrc = task.images[value.image]
        
        return (
          <FilterButton
            key={selectedValueId}
            characteristicId={characteristicId}
            checked
            onFilter={handleFilter}
            valueImageSrc={valueImageSrc}
          />
        )
      })}
    </Box>
  )
}

FilterStatus.propTypes = {
  task: PropTypes.shape({
    help: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired
}
