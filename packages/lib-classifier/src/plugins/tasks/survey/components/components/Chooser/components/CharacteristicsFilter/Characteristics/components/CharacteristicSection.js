import { Box, RadioButtonGroup } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import { SpacedHeading } from '@zooniverse/react-components'

import FilterButton from '../../components/FilterButton'

const defaultCharacteristic = {
  values: {},
  valuesOrder: []
}

export default function CharacteristicSection({
  characteristic = defaultCharacteristic,
  characteristicId = '',
  images = {},
  label = '',
  onFilter = () => true,
  selectedValueId = '',
  strings
}) {
  const characteristicOptions = characteristic.valuesOrder.map(valueId => {
    const value = characteristic?.values?.[valueId] || {}
    const valueImageSrc = images?.[value.image] || ''
    const label = strings.get(`characteristics.${characteristicId}.values.${valueId}.label`)

    return ({
      disabled: false,
      id: `${characteristicId}-${valueId}`,
      imageSrc: valueImageSrc,
      label,
      value: valueId
    })
  })

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
        id={`${label}-heading`}
        margin='none'
      >
        {label}
      </SpacedHeading>
      <RadioButtonGroup
        aria-labelledby={`${label}-heading`}
        direction='row'
        gap='xsmall'
        name={`${characteristic.label}-filter`}
        onChange={({ target }) => onFilter(characteristicId, target.value)}
        options={characteristicOptions}
        value={selectedValueId}
        wrap
      >
        {(option, { checked, focus, hover }) => {
          return (
            <FilterButton
              characteristicId={characteristicId}
              characteristicLabel={label}
              checked={checked}
              focus={focus}
              hover={hover}
              onFilter={onFilter}
              valueId={option.value}
              valueImageSrc={option.imageSrc}
              valueLabel={option.label}
            />
          )
        }}
      </RadioButtonGroup>
    </Box>
  )
}

CharacteristicSection.propTypes = {
  characteristic: PropTypes.shape({
    label: PropTypes.string,
    values: PropTypes.objectOf(
      PropTypes.shape({
        image: PropTypes.string,
        label: PropTypes.string
      })
    ),
    valuesOrder: PropTypes.arrayOf(PropTypes.string)
  }),
  characteristicId: PropTypes.string,
  images: PropTypes.objectOf(PropTypes.string),
  onFilter: PropTypes.func,
  selectedValueId: PropTypes.string
}
