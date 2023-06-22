import { Box, Button, FormField, Grid, Select } from 'grommet'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

function SelectCollection ({
  collections,
  disabled,
  onSelect,
  onSearch,
  onSubmit,
  selected
}) {
  const [searchText, setSearchText] = useState('')
  const { t } = useTranslation('components')
  const dropProps = {
    trapFocus: false
  }
  function onTextChange(text) {
    onSearch({
      favorite: false,
      current_user_roles: 'owner,collaborator,contributor',
      search: text.length > 3 ? text : undefined
    })
    setSearchText(text)
  }
  const options = searchText.length > 3 ?
    collections :
    collections.filter(collection => collection.display_name.includes(searchText))

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
          onSearch={onTextChange}
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

SelectCollection.defaultProps = {
  disabled: false,
  selected: {}
}

export default observer(SelectCollection)
