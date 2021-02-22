import { Box, Button } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

import CharacteristicSection from './components/CharacteristicSection'

export default function Characteristics (props) {
  const {
    characteristics,
    characteristicsOrder,
    filters,
    images,
    onFilter
  } = props

  return (
    <Box
      fill='horizontal'
    >
      {characteristicsOrder.map((characteristicId, i) => {
        const characteristic = characteristics[characteristicId] || {}
        const selectedValueId = filters[characteristicId] || ''

        return (
          <CharacteristicSection
            key={characteristicId}
            characteristic={characteristic}
            characteristicId={characteristicId}
            images={images}
            onFilter={onFilter}
            selectedValueId={selectedValueId}
          />)
      })}
      <Button
        label="Clear filters"
        onClick={() => onFilter()}
      />
    </Box>
  )
}

Characteristics.defaultProps = {
  characteristics: {},
  characteristicsOrder: [],
  filters: {},
  images: {},
  onFilter: () => {}
}

Characteristics.propTypes = {
  characteristics: PropTypes.objectOf(
    PropTypes.shape({
      label: PropTypes.string,
      values: PropTypes.object,
      valuesOrder: PropTypes.arrayOf(PropTypes.string)
    })
  ),
  characteristicsOrder: PropTypes.arrayOf(PropTypes.string),
  filters: PropTypes.objectOf(PropTypes.string),
  images: PropTypes.objectOf(PropTypes.string),
  onFilter: PropTypes.func
}
