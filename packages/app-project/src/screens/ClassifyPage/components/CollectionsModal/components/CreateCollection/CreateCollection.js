import counterpart from 'counterpart'
import { Box, Button, CheckBox, FormField, Grid, TextInput } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function CreateCollection ({
  collection,
  disabled,
  onChange,
  onSubmit
}) {
  const checkbox = React.createRef()
  const textInput = React.createRef()
  const { display_name, private: isPrivate } = collection
  function updateCollection () {
    const display_name = textInput.current.value
    const isPrivate = checkbox.current.checked
    onChange({
      display_name,
      private: isPrivate
    })
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
        htmlFor='collectionName'
        label={counterpart('CreateCollection.label')}
      >
        <TextInput
          id='collectionName'
          onChange={updateCollection}
          ref={textInput}
          value={display_name}
        />
      </FormField>
      <Box
        align='center'
        margin={{ top: 'medium' }}
        pad={{ top: 'small' }}
      >
        <Button
          disabled={disabled}
          label={counterpart('CreateCollection.createButton')}
          type='submit'
        />
      </Box>
      <CheckBox
        checked={isPrivate}
        label={counterpart('CreateCollection.private')}
        onChange={updateCollection}
        ref={checkbox}
      />
    </Grid>
  )
}

CreateCollection.propTypes = {
  collection: PropTypes.shape({
    display_name: PropTypes.string,
    private: PropTypes.bool
  }),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
}

CreateCollection.defaultProps = {
  collection: {
    display_name: '',
    private: false
  },
  disabled: false,
  onChange: () => true,
  onSubmit: () => true
}

export default CreateCollection
