import { Box, DropButton } from 'grommet'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import styled from 'styled-components'
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
  padding: 3px 8px;

  &:focus,
  &:enabled:hover {
    text-decoration: underline;
  }

  &:hover:not(:focus) {
    box-shadow: none;
  }
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
      border={{
        color: 'light-5',
        size: 'xsmall',
        style: 'solid',
        side: 'bottom'
      }}
      align='center'
      direction='row'
      fill='horizontal'
      gap='xxsmall'
      height='xxsmall'
    >
      <StyledDropButton
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
          />
        }
        dropProps={{
          elevation: 'medium',
        }}
        dropTarget={filterStatusRef.current}
        gap='none'
        icon={<FilterIcon />}
        label={
          <StyledLabel
            color={{
              dark: 'accent-1',
              light: 'neutral-1'
            }}
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
