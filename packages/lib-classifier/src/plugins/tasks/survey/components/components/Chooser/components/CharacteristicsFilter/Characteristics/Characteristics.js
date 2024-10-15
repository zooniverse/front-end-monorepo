import { Box, Button } from 'grommet'
import { observer, PropTypes as MobXPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import { useTranslation } from '@translations/i18n'

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
      data-testid='characteristics'
      fill='horizontal'
      flex='grow'
    >
      {characteristicsOrder.map((characteristicId) => {
        const characteristic = characteristics.get(characteristicId) || {}
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
  characteristics: MobXPropTypes.observableMap,
  characteristicsOrder: PropTypes.arrayOf(PropTypes.string),
  filters: PropTypes.objectOf(PropTypes.string),
  images: MobXPropTypes.observableMap,
  onFilter: PropTypes.func
}

export default observer(Characteristics)
