import { Box, Button, CheckBox, FormField, Grid, TextInput } from 'grommet'
import PropTypes from 'prop-types'
import { createRef } from 'react'
import { useTranslation } from 'next-i18next'

const defaultCollection = {
  display_name: '',
  private: false
}

const DEFAULT_HANDLER = () => true

function CreateCollection ({ collection = defaultCollection, disabled = false, onChange = DEFAULT_HANDLER, onSubmit = DEFAULT_HANDLER }) {
  const { t } = useTranslation('components')
  const checkbox = createRef()
  const textInput = createRef()
  const { display_name, private: isPrivate } = collection // eslint-disable-line
  function updateCollection () {
    const display_name = textInput.current.value // eslint-disable-line
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
        label={t('CollectionsModal.CreateCollection.label')}
      >
        <TextInput
          id='collectionName'
          onChange={updateCollection}
          ref={textInput}
          value={display_name} // eslint-disable-line
        />
      </FormField>
      <Box align='center' margin={{ top: 'medium' }} pad={{ top: 'small' }}>
        <Button
          disabled={disabled}
          label={t('CollectionsModal.CreateCollection.createButton')}
          type='submit'
        />
      </Box>
      <CheckBox
        checked={isPrivate}
        label={t('CollectionsModal.CreateCollection.private')}
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

export default CreateCollection
