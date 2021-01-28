import { Box, RadioButtonGroup, Text } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

import FilterButton from './FilterButton'

export default function CharacteristicSection (props) {
  const {
    characteristic,
    characteristicId,
    images,
    onFilter,
    selectedValueId
  } = props
  
  return (
    <Box>
      <Text>{characteristic.label}</Text>
      <Box
        direction='row'
        wrap
      >
        <RadioButtonGroup
          name="radio"
          direction="row"
          gap="small"
          options={characteristic.valuesOrder}
          value={selectedValueId}
          onChange={event => onFilter(characteristicId, event.target.value)}
        >
          {(option, { checked, hover }) => {
            const value = characteristic.values[option]
            const valueImageSrc = images[value.image]
          
            return (
              <FilterButton
                checked={checked}
                valueImageSrc={valueImageSrc}
              />
            )
          }}
        </RadioButtonGroup>
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
  characteristicId: '',
  images: {},
  onFilter: () => {},
  selectedValueId: ''
}

CharacteristicSection.propTypes = {
  characteristic: PropTypes.shape({
    label: PropTypes.string,
    values: PropTypes.object,
    valuesOrder: PropTypes.arrayOf(PropTypes.string)
  }),
  characteristicId: PropTypes.string,
  images: PropTypes.objectOf(PropTypes.string),
  onFilter: PropTypes.func,
  selectedValueId: PropTypes.string
}
