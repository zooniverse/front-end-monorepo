import { Box, Button, FormField, Grid, Select } from 'grommet'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'

function SelectCollection ({
  collections,
  disabled,
  onSelect,
  onSearch,
  onSubmit,
  selected
}) {
  const { t } = useTranslation('components')
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
          onSearch={searchText => onSearch({
            favorite: false,
            current_user_roles: 'owner,collaborator,contributor',
            search: searchText
          })}
          options={collections}
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

SelectCollection.defaultProps = {
  disabled: false,
  selected: {}
}

export default SelectCollection
