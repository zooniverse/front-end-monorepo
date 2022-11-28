import { Box, RadioButtonGroup } from 'grommet'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
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
  const onChange = useCallback(
    ({ target }) => onFilter(characteristicId, target?.value),
    [characteristicId, onFilter]
  )
  const radioButtonLabel = useCallback((option, { checked, focus, hover }) => {
    function clearSelection(event) {
      /*
      This is a workaround to prevent the label from being clicked in Chrome, when the radio
      button is already checked. However, it makes the delete function hard to use from the keyboard.
      */
      event.preventDefault()
      return onFilter(characteristicId)
    }
    return (
      <FilterButton
        characteristicId={characteristicId}
        characteristicLabel={label}
        checked={checked}
        focus={focus}
        hover={hover}
        onDelete={clearSelection}
        valueId={option.value}
        valueImageSrc={option.imageSrc}
        valueLabel={option.label}
      />
    )
  }, [characteristicId, label, onFilter])

  const characteristicOption = useCallback(valueId => {
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
  }, [characteristic, characteristicId, images, strings])
  const characteristicOptions = characteristic.valuesOrder.map(characteristicOption)

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
        onChange={onChange}
        options={characteristicOptions}
        value={selectedValueId}
        wrap
      >
        {radioButtonLabel}
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
