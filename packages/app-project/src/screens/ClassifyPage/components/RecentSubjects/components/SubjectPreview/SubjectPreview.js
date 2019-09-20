import counterpart from 'counterpart'
import { array, bool, number, shape, string } from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Anchor, Box } from 'grommet'
import { Media } from '@zooniverse/react-components'
import { CollectionsButton, FavouritesButton, TalkLink } from './components'
import CollectionsModal from '../../../../components/CollectionsModal'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function SubjectPreview ({ height, recent, slug, width }) {
  const subjectURLs = recent.locations.map(location => Object.values(location)[0])
  const subjectURL = subjectURLs[0]
  const [ checked, setChecked ] = useState(recent.favorite)
  const collectionsModal = React.createRef()
  const href=`/projects/${slug}/talk/subjects/${recent.subjectId}`

  function addToCollections () {
    collectionsModal.current.wrappedInstance.open(recent.subjectId)
  }

  function toggleFavorite () {
    recent.toggleFavorite()
    setChecked(recent.favorite)
  }

  return (
    <Box
      fill
    >
      <CollectionsModal
        ref={collectionsModal}
      />
      <Anchor
        href={href}
      >
        <Media
          alt={`subject ${recent.subjectId}`}
          height={height}
          src={subjectURL}
          width={width}
        />
      </Anchor>
      <TalkLink
        href={href}
      />
      <FavouritesButton
        checked={recent.favorite}
        onClick={toggleFavorite}
      />
      <CollectionsButton
        onClick={addToCollections}
      />
    </Box>
  )
}

SubjectPreview.propTypes = {
  className: string,
  height: number,
  recent: shape({
    favorite: bool,
    subjectId: string,
    locations: array
  }),
  slug: string.isRequired,
  width: number
}

SubjectPreview.defaultProps = {
  height: 250,
  recent: {
    favorite: false,
    subjectId: '',
    locations: []
  },
  width: 400
}

export default SubjectPreview
