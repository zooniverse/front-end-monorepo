import { Box, Button } from 'grommet'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'

import CharacteristicSection from './components/CharacteristicSection'

function Characteristics({
  characteristics = {},
  characteristicsOrder = [],
  filters  = {},
  images = {},
  onFilter = () => true,
  strings
}) {
  const { t } = useTranslation('plugins')

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
            label={strings.get(`characteristics.${characteristicId}.label`)}
            onFilter={onFilter}
            selectedValueId={selectedValueId}
            strings={strings}
          />
        )
      })}
      <Box
        pad='small'
      >
        <Button
          label={t('SurveyTask.CharacteristicsFilter.clearFilters')}
          onClick={() => onFilter()}
        />
      </Box>
    </Box>
  )
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

export default observer(Characteristics)
