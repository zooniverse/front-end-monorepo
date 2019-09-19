import counterpart from 'counterpart'
import { array, bool, shape, string } from 'prop-types'
import React, { useState } from 'react'
import { Anchor } from 'grommet'
import { Media } from '@zooniverse/react-components'
import { CollectionsButton, FavouritesButton, TalkLink } from './components'
import CollectionsModal from '../../../../components/CollectionsModal'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function SubjectPreview ({ recent, slug }) {
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
    <div>
      <CollectionsModal
        ref={collectionsModal}
      />
      <Anchor
        href={href}
      >
        <Media
          alt={`subject ${recent.subjectId}`}
          height={250}
          src={subjectURL}
          width={400}
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
    </div>
  )
}

SubjectPreview.propTypes = {
  recent: shape({
    favorite: bool,
    subjectId: string,
    locations: array
  }),
  slug: string.isRequired
}

SubjectPreview.defaultProps = {
  recent: {
    favorite: false,
    subjectId: '',
    locations: []
  }
}

export default SubjectPreview
