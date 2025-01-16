import { SpacedText } from '@zooniverse/react-components'
import { Box, Button, Collapsible } from 'grommet'
import PropTypes from 'prop-types'
import { useState } from 'react'
import styled from 'styled-components'

import { useTranslation } from '@translations/i18n'

import FilterIcon from './FilterIcon'
import FilterLabel from '../components/FilterLabel'
import Characteristics from '../Characteristics'
import ClearFilters from '../ClearFilters'

const StyledButton = styled(Button)`
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

const DEFAULT_HANDLER = () => true

export default function FilterStatus ({
  disabled = false,
  filters = {},
  handleFilter = DEFAULT_HANDLER,
  showingChoices = 0,
  task
}) {
  const [filterOpen, setFilterOpen] = useState(false)

  const {
    characteristics,
    characteristicsOrder,
    choices,
    images,
    strings
  } = task
  
  const { t } = useTranslation('plugins')

  const selectedCharacteristicIds = Object.keys(filters)

  function handleFilterOpen () {
    setFilterOpen(!filterOpen)
  }

  return (
    <Box>
      <Box
        align='start'
        data-testid='filter-status'
        direction='row'
        gap='xxsmall'
        justify='between'
      >
        <StyledButton
          a11yTitle={t('SurveyTask.CharacteristicsFilter.filter')}
          disabled={disabled}
          gap='none'
          icon={<FilterIcon />}
          label={
            <StyledLabel
              color={{
                dark: 'accent-1',
                light: 'neutral-1'
              }}
            >
              {t('SurveyTask.CharacteristicsFilter.filter')}
            </StyledLabel>
          }
          onClick={handleFilterOpen}
        />
        <Box
          direction='row-reverse'
          wrap={true}
        >
          {selectedCharacteristicIds.map(characteristicId => {
            const characteristic = characteristics?.get(characteristicId) || {}
            const selectedValueId = filters?.[characteristicId] || ''
            const value = characteristic.values?.get(selectedValueId) || {}
            const valueImageSrc = images?.get(value.image) || ''
            const label = strings.get(`characteristics.${characteristicId}.values.${selectedValueId}.label`)
            function clearSelection() {
              handleFilter(characteristicId)
            }

            return (
              <Button
                key={`${characteristicId}-${selectedValueId}`}
                a11yTitle={t('SurveyTask.CharacteristicsFilter.removeFilter', { valueLabel: label })}
                label={
                  <FilterLabel
                    characteristicId={characteristicId}
                    selected={true}
                    valueId={selectedValueId}
                    valueImageSrc={valueImageSrc}
                    valueLabel={label}
                  />
                }
                margin={{ bottom: 'xxsmall', left: 'xxsmall' }}
                onClick={clearSelection}
                plain
              />
            )
          })}
        </Box>
      </Box>
      {(selectedCharacteristicIds.length && !filterOpen) ? (
        <ClearFilters
          onClick={() => handleFilter()}
          showingChoices={showingChoices}
          totalChoices={choices.size}
        />
      ) : null}
      <Collapsible open={filterOpen}>
        <Characteristics
          characteristics={characteristics}
          characteristicsOrder={characteristicsOrder}
          filters={filters}
          handleFilterOpen={handleFilterOpen}
          images={images}
          onFilter={handleFilter}
          strings={strings}
        />
      </Collapsible>
    </Box>
  )
}

FilterStatus.propTypes = {
  disabled: PropTypes.bool,
  filters: PropTypes.objectOf(PropTypes.string),
  handleFilter: PropTypes.func,
  showingChoices: PropTypes.number,
  task: PropTypes.shape({
    help: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired
}
