import { Box, Button, FormField, Grid, Select } from 'grommet'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

/*
  Tune this value to determine when a search term
  is long enough to use Panoptes full-text search.
*/
const MIN_SEARCH_LENGTH = 3;

function SelectCollection ({
  collections = [],
  disabled = false,
  onSearch,
  onSelect,
  onSubmit,
  selected = {},
  userID = ''
}) {
  const [searchText, setSearchText] = useState('')
  const { t } = useTranslation('components')

  const dropProps = {
    trapFocus: false
  }

  /*
  Panoptes collections search uses Postgres full-text search, which needs at least 4 characters.
  For shorter strings, we request all your collections then filter the display names.
  */

  async function onTextChange(text) {
    const search = text.trim()
    await onSearch({
      favorite: false,
      current_user_roles: 'owner,collaborator,contributor',
      search: search.length > MIN_SEARCH_LENGTH ? search : undefined
    })
    setSearchText(search)
  }

  function collectionNameFilter(collection) {
    const displayNameLowerCase = collection?.display_name?.toLowerCase()
    if (!displayNameLowerCase) return false
    return displayNameLowerCase.includes(searchText.toLowerCase())
  }

  /*
  Determines the display label for the specific collection.
  Returns "Example Collection" if that collection belongs to the current user,
  otherwise returns "Example Collection (Another User's Name)"

  NOTE: sometime between Grommet > 2.41.0 and <= 2.45.1, the behaviour of
  <Select> changed. Now, when <Select> initially renders and _nothing_ is
  selected, labelKey is called with an empty object {} argument. Prior to this
  change, collectionLabel() was only called when there's a valid collection
  object to render. (e.g. when clicking on Select to display list of options.)
  
  As a result, collectionLabel() now handles "no selection" (collection === {})
  without crashing, returning a meaningless "undefined (undefined)". The
  <Select> still shows blank ("") when there's no selection, though. Go figure.
   */
  function collectionLabel(collection) {
    if (collection?.links?.owner?.id === userID) {
      return collection?.display_name
    }
    return `${collection?.display_name} (${collection?.links?.owner?.display_name})`
  }

  /*
    If the search text is long enough, use fuzzy full-text search. Otherwise, filter collections by display name.
  */
  const options = searchText.length > MIN_SEARCH_LENGTH
    ? collections
    : collections.filter(collectionNameFilter)


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
          labelKey={collectionLabel}
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

export default observer(SelectCollection)
