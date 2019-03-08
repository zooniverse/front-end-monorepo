import counterpart from 'counterpart'
import { Box, Button, CheckBox, FormField, TextInput } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function CreateCollection ({
  disabled
}) {
  const checkbox = React.createRef()
  let isPrivate = false
  function onTogglePrivate () {
    isPrivate = !isPrivate
    checkbox.current.checked = isPrivate
    console.log(checkbox.current, checkbox.current.checked)
  }
  return (
    <React.Fragment>
      <FormField
        htmlFor='collectionName'
        label={counterpart('CreateCollection.label')}
      >
        <TextInput
          id='collectionName'
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
        />
      </Box>
      <CheckBox
        checked={isPrivate}
        label='Private collection'
        onChange={onTogglePrivate}
        ref={checkbox}
      />
    </React.Fragment>
  )
}

CreateCollection.propTypes = {
}

CreateCollection.defaultProps = {
}

export default CreateCollection
