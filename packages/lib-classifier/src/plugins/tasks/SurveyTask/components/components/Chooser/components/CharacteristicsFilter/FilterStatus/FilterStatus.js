import { Box, DropButton } from 'grommet'
import { Filter } from 'grommet-icons'
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { SpacedText } from '@zooniverse/react-components'

import Characteristics from '../Characteristics'
import FilterButton from '../Characteristics/components/FilterButton'

import counterpart from 'counterpart'
import en from '../locales/en'

counterpart.registerTranslations('en', en)

const StyledDropButton = styled(DropButton)`
  border: none;
  border-radius: 16px;
  padding: 5px 10px;

  ${props => props.backgroundColor ? css`
    background-color: ${props.theme.global.colors['accent-2']};
  ` : css`
    background-color: none;
  `}
`

const StyledLabel = styled(SpacedText)`
  text-transform: uppercase;
`

export default function FilterStatus (props) {
  const { task } = props
  const { 
    characteristics,
    characteristicsOrder,
    images
  } = task
  
  const filterStatusRef = useRef()

  // TODO: refactor filter state to model
  const [ filters, setFilters ] = useState({})

  function handleFilter (characteristicId, valueId) {
    let newFilters = Object.assign({}, filters)
    if (valueId) {
      newFilters[characteristicId] = valueId
    } else if (characteristicId) {
      delete newFilters[characteristicId]
    } else {
      newFilters = {}
    }
    setFilters(newFilters)
  }

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
        icon={<Filter />}
        label={
          <StyledLabel 
            color='neutral-2'
          >
            {counterpart('SurveyTask.filter')}
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

FilterStatus.propTypes = {
  task: PropTypes.shape({
    help: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired
}
