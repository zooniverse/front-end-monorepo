import { Box, RadioButtonGroup } from 'grommet'
import { PropTypes as MobXPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import { useCallback } from 'react';
import { SpacedHeading } from '@zooniverse/react-components'

import FilterLabel from '../../components/FilterLabel'

const DEFAULT_CHARACTERISTIC = {
  values: {},
  valuesOrder: []
}

const DEFAULT_HANDLER = () => true

export default function CharacteristicSection({
  characteristic = DEFAULT_CHARACTERISTIC,
  characteristicId = '',
  images = {},
  label = '',
  onFilter = DEFAULT_HANDLER,
  selectedValueId = '',
  strings
}) {
  const onChange = useCallback(
    ({ target }) => onFilter(characteristicId, target?.value),
    [characteristicId, onFilter]
  )
  const radioButtonLabel = useCallback((option, { checked, focus, hover }) => {
    return (
      <FilterLabel
        characteristicId={characteristicId}
        characteristicLabel={label}
        checked={checked}
        focus={focus}
        hover={hover}
        valueId={option.value}
        valueImageSrc={option.imageSrc}
        valueLabel={option.label}
      />
    )
  }, [characteristicId, label, onFilter])

  const characteristicOption = useCallback(valueId => {
    const value = characteristic?.values?.get(valueId) || {}
    const valueImageSrc = images?.get(value.image) || ''
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
      margin={{ bottom: 'small' }}
    >
      <SpacedHeading
        id={`${label}-heading`}
        color={{
          dark: 'neutral-6',
          light: 'neutral-7'
        }}
        margin={{
          bottom: 'xsmall',
          top: 'small'
        }}
        pad='none'
        size='1rem'
      >
        {label}
      </SpacedHeading>
      <RadioButtonGroup
        aria-labelledby={`${label}-heading`}
        cssGap={true}
        direction='row'
        gap={{
          column: 'small',
          row: 'xsmall'
        }}
        name={`${characteristic.label}-filter`}
        onChange={onChange}
        options={characteristicOptions}
        value={selectedValueId}
        wrap={true}
      >
        {radioButtonLabel}
      </RadioButtonGroup>
    </Box>
  )
}

CharacteristicSection.propTypes = {
  characteristic: PropTypes.shape({
    label: PropTypes.string,
    values: MobXPropTypes.observableMap,
    valuesOrder: PropTypes.arrayOf(PropTypes.string)
  }),
  characteristicId: PropTypes.string,
  images: MobXPropTypes.observableMap,
  label: PropTypes.string,
  onFilter: PropTypes.func,
  selectedValueId: PropTypes.string
}
