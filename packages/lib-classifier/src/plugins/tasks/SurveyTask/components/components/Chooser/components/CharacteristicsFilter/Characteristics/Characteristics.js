import { Box, Button } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

import CharacteristicSection from './components/CharacteristicSection'

import counterpart from 'counterpart'
import en from '../locales/en'

counterpart.registerTranslations('en', en)

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
      flex='grow'
    >
      {characteristicsOrder.map((characteristicId) => {
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
          />
        )
      })}
      <Box
        pad='small'
      >
        <Button
          label={counterpart('SurveyTask.clearFilters')}
          onClick={() => onFilter()}
        />
      </Box>
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
      values: PropTypes.objectOf(
        PropTypes.shape({
          image: PropTypes.string,
          label: PropTypes.string
        })
      ),
      valuesOrder: PropTypes.arrayOf(PropTypes.string)
    })
  ),
  characteristicsOrder: PropTypes.arrayOf(PropTypes.string),
  filters: PropTypes.objectOf(PropTypes.string),
  images: PropTypes.objectOf(PropTypes.string),
  onFilter: PropTypes.func
}
