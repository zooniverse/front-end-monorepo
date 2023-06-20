import { Box, Button, FormField, Grid, Select } from 'grommet'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

function SelectCollection ({
  collections = [],
  disabled = false,
  onSelect,
  onSubmit,
  selected
}) {
  const { t } = useTranslation('components')
  const [options, setOptions] = useState(collections)

  /** https://storybook.grommet.io/?path=/story/input-select-search--search */
  const onSearch = (text) => {
    const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')
    const exp = new RegExp(escapedText, 'i')
    setOptions(collections.filter((collection) => exp.test(collection.display_name)))
  }

  const dropProps = {
    trapFocus: false
  }

  return (
    <Grid
      as='form'
      columns={['2fr', '1fr']}
      gap='small'
      rows={['1fr']}
      method='post'
      action=''
      onSubmit={onSubmit}
    >
      <FormField
        htmlFor='collectionsSearch'
        label={t('CollectionsModal.SelectCollection.label')}
      >
        <Select
          dropHeight='medium'
          dropProps={dropProps}
          id='collectionsSearch'
          labelKey='display_name'
          name='display_name'
          onChange={onSelect}
          onSearch={onSearch}
          options={options}
          valueKey='id'
          value={selected}
        />
      </FormField>
      <Box
        align='center'
        margin={{ top: 'medium' }}
        pad={{ top: 'small' }}
      >
        <Button
          disabled={disabled}
          label={t('CollectionsModal.SelectCollection.addButton')}
          type='submit'
        />
      </Box>
    </Grid>
  )
}

SelectCollection.propTypes = {
  disabled: PropTypes.bool,
  selected: PropTypes.shape({})
}

export default SelectCollection
