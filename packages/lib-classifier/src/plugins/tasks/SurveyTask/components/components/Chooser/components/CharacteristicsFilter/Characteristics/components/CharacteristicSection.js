import { Box, Text } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

import FilterButton from './FilterButton'

export default function CharacteristicSection (props) {
  const { characteristic, images } = props

  return (
    <Box>
      <Text>{characteristic.label}</Text>
      <Box
        direction='row'
        wrap
      >
        {characteristic.valuesOrder.map((valueId) => {
          const value = characteristic.values[valueId]
          const valueImageSrc = images[value.image]
          
          return (
            <FilterButton
              key={valueId}
              value={value}
              valueImageSrc={valueImageSrc}
            />
          )
          })}
      </Box>
    </Box>
  )
}

CharacteristicSection.defaultProps = {
  characteristic: {
    label: '',
    values: {},
    valuesOrder: []
  },
  images: {}
}

CharacteristicSection.propTypes = {
  characteristic: PropTypes.shape({
    label: PropTypes.string,
    values: PropTypes.object,
    valuesOrder: PropTypes.arrayOf(PropTypes.string)
  }),
  images: PropTypes.objectOf(PropTypes.string)
}
