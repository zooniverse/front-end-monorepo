import { SpacedText } from '@zooniverse/react-components'
import { Box, Button } from 'grommet'
import { FormUp } from 'grommet-icons'
import { observer, PropTypes as MobXPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { useTranslation } from '@translations/i18n'

import CharacteristicSection from './components/CharacteristicSection'

const StyledBox = styled(Box)`
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.80) 0%, rgba(239, 242, 245, 0.80) 100%), #FFF;
  border-radius: 0px 0px 16px 16px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.20);
  margin-bottom: 4px;
`

const DEFAULT_HANDLER = () => true

function Characteristics({
  characteristics = {},
  characteristicsOrder = [],
  filters  = {},
  handleFilterOpen = DEFAULT_HANDLER,
  images = {},
  onFilter = DEFAULT_HANDLER,
  strings
}) {
  const { t } = useTranslation('plugins')

  return (
    <StyledBox
      align='center'
      pad={{
        bottom: 'small',
        horizontal: 'small'
      }}
    >
      <Box
        border={{
          color: 'light-4',
          style: 'solid',
          side: 'between'
        }}
        fill='horizontal'
        flex='grow'
        gap='xsmall'
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
      </Box>
      <Button
        label={
          <Box
            align='center'
            direction='row'
          >
            <SpacedText size='1rem'>
              {t('SurveyTask.CharacteristicsFilter.closeFilters')}
            </SpacedText>
            <FormUp />
          </Box>
        }
        onClick={handleFilterOpen}
        plain
      />
    </StyledBox>
  )
}

Characteristics.propTypes = {
  characteristics: MobXPropTypes.observableMap,
  characteristicsOrder: PropTypes.arrayOf(PropTypes.string),
  filters: PropTypes.objectOf(PropTypes.string),
  handleFilterOpen: PropTypes.func,
  images: MobXPropTypes.observableMap,
  onFilter: PropTypes.func
}

export default observer(Characteristics)
