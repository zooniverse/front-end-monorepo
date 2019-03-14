import counterpart from 'counterpart'
import { Box, Button, FormField, Select } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function SelectCollection ({
  collections,
  disabled,
  onSelect,
  onSearch,
  onSubmit
}) {
  return (
    <form
      method='post'
      action=''
      onSubmit={onSubmit}
    >
      <FormField
        htmlFor='collectionsSearch'
        label={counterpart('SelectCollection.label')}
      >
        <Select
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
        />
      </FormField>
      <Box
        align='center'
        margin={{ top: 'medium' }}
        pad={{ top: 'small' }}
      >
        <Button
          disabled={disabled}
          label={counterpart('SelectCollection.addButton')}
          type='submit'
        />
      </Box>
    </form>
  )
}

SelectCollection.propTypes = {
  disabled: PropTypes.bool
}

SelectCollection.defaultProps = {
  disabled: false
}

export default SelectCollection
