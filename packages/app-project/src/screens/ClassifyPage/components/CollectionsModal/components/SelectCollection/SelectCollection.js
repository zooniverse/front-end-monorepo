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
    <React.Fragment>
      <FormField
        htmlFor='collectionsSearch'
        label={counterpart('SelectCollection.label')}
      >
        <Select
          id='collectionsSearch'
          labelKey='display_name'
          onChange={onSelect}
          onSearch={searchText => onSearch({ favorite: false, search: searchText })}
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
          onClick={onSubmit}
        />
      </Box>
    </React.Fragment>
  )
}

SelectCollection.propTypes = {
  disabled: PropTypes.bool
}

SelectCollection.defaultProps = {
  disabled: false
}

export default SelectCollection
