import { func, string } from 'prop-types'
import { useTranslation } from 'next-i18next/pages'
import { FormField, Select, ThemeContext } from 'grommet'
import styled from 'styled-components'

import { COLLECTION_SORT_OPTIONS, normalizeCollectionSort } from '@helpers/collectionQueryParams'
import selectTheme from './selectTheme'

const StyledSelect = styled(Select)`
  text-align: center;
  text-transform: uppercase;
`

function CollectionsSortSelect({ onChange, value = 'display_name' }) {
  const { t } = useTranslation('screens')
  const options = COLLECTION_SORT_OPTIONS.map(option => ({
    label: t(`Collect.sortOptions.${option.labelKey}`),
    value: option.value
  }))
  const selectedOption = options.find(option => option.value === normalizeCollectionSort(value))

  return (
    <ThemeContext.Extend value={selectTheme}>
      <FormField
        align='center'
        direction='row'
        gap='xsmall'
        htmlFor='collections-sort-select'
        label={t('Collect.sortBy')}
        margin='none'
      >
        <StyledSelect
          id='collections-sort-select'
          labelKey='label'
          name='collections-sort-select'
          onChange={({ option }) => onChange(option.value)}
          options={options}
          size='medium'
          value={selectedOption?.label}
          valueKey={{ key: 'label', reduce: true }}
        />
      </FormField>
    </ThemeContext.Extend>
  )
}

CollectionsSortSelect.propTypes = {
  onChange: func.isRequired,
  value: string
}

export default CollectionsSortSelect