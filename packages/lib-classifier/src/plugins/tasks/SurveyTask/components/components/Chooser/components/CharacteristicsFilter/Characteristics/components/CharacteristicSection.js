import { Box, RadioButtonGroup, Text } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import { SpacedHeading } from '@zooniverse/react-components'

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
    <Box
      border={{
        color: 'light-5',
        size: 'xsmall',
        style: 'solid',
        side: 'bottom'
      }}
      pad={{
        horizontal: 'small'
      }}
    >
      <SpacedHeading
        margin='none'
      >
        {characteristic.label}
      </SpacedHeading>
      <RadioButtonGroup
        name={`${characteristic.label}RadioButtonGroup`}
        direction='row'
        gap='xsmall'
        onChange={event => onFilter(characteristicId, event.target.value)}
        options={characteristic.valuesOrder}
        value={selectedValueId}
        wrap
      >
        {(option, { checked, hover }) => {
          const value = characteristic?.values?.[option] || {}
          const valueImageSrc = images?.[value.image] || ''
        
          return (
            <FilterButton
              characteristicId={characteristicId}
              valueLabel={value.label}
              checked={checked}
              onFilter={onFilter}
              valueImageSrc={valueImageSrc}
            />
          )
        }}
      </RadioButtonGroup>
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
