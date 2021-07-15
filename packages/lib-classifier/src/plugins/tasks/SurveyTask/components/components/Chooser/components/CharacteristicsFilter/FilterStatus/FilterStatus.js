import { Box, DropButton } from 'grommet'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import styled, { css } from 'styled-components'
import { SpacedText } from '@zooniverse/react-components'

import Characteristics from '../Characteristics'
import FilterButton from '../components/FilterButton'
import FilterIcon from './FilterIcon'

import counterpart from 'counterpart'
import en from '../locales/en'

counterpart.registerTranslations('en', en)

const StyledDropButton = styled(DropButton)`
  border: none;
  border-radius: 16px;
  padding: 5px 10px;

  ${props => props.backgroundColor ? css`
    background-color: ${props.theme.global.colors['accent-1']};
  ` : css`
    background-color: none;
  `}
`

const StyledLabel = styled(SpacedText)`
  text-transform: uppercase;
`

export default function FilterStatus (props) {
  const {
    disabled,
    filters,
    handleFilter,
    task
  } = props
  const {
    characteristics,
    characteristicsOrder,
    images
  } = task

  const filterStatusRef = useRef()

  const selectedCharacteristicIds = Object.keys(filters)

  return (
    <Box
      ref={filterStatusRef}
      align='center'
      direction='row'
      fill='horizontal'
      gap='xxsmall'
    >
      <StyledDropButton
        backgroundColor={selectedCharacteristicIds.length > 0}
        disabled={disabled}
        dropAlign={{
          left: 'left',
          top: 'bottom'
        }}
        dropContent={
          <Characteristics
            characteristics={characteristics}
            characteristicsOrder={characteristicsOrder}
            filters={filters}
            images={images}
            onFilter={handleFilter}
          />}
        dropProps={{
          elevation: 'medium',
          stretch: 'align'
        }}
        dropTarget={filterStatusRef.current}
        gap='none'
        icon={<FilterIcon />}
        label={
          <StyledLabel
            color='neutral-1'
          >
            {counterpart('CharacteristicsFilter.filter')}
          </StyledLabel>
        }
      />
      {selectedCharacteristicIds.map(characteristicId => {
        const characteristic = characteristics?.[characteristicId] || {}
        const selectedValueId = filters?.[characteristicId] || ''
        const value = characteristic.values?.[selectedValueId] || {}
        const valueImageSrc = images?.[value.image] || ''

        return (
          <FilterButton
            key={selectedValueId}
            characteristicId={characteristicId}
            checked
            onFilter={handleFilter}
            buttonSize='small'
            valueImageSrc={valueImageSrc}
            valueLabel={value.label}
          />
        )
      })}
    </Box>
  )
}

FilterStatus.defaultProps = {
  disabled: false,
  filters: {},
  handleFilter: () => {}
}

FilterStatus.propTypes = {
  disabled: PropTypes.bool,
  filters: PropTypes.objectOf(PropTypes.string),
  handleFilter: PropTypes.func,
  task: PropTypes.shape({
    help: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired
}
