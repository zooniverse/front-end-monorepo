import counterpart from 'counterpart'
import { array, bool, func, number, shape, string } from 'prop-types'
import React, { useState } from 'react'
import { Anchor, Box } from 'grommet'
import { Media } from '@zooniverse/react-components'
import { CollectionsButton, FavouritesButton, TalkLink } from './components'
import CollectionsModal from '../../../../components/CollectionsModal'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function SubjectPreview ({ height, isLoggedIn, subject, slug, width }) {
  const subjectURLs = subject.locations.map(location => Object.values(location)[0])
  const subjectURL = subjectURLs[0]
  const [ isFavourite, setIsFavourite ] = useState(subject.favorite)
  const collectionsModal = React.createRef()
  const href = `/projects/${slug}/talk/subjects/${subject.subjectId}`

  function addToCollections () {
    collectionsModal.current.wrappedInstance.open(subject.id)
  }

  function toggleFavourite () {
    subject.toggleFavourite()
    setIsFavourite(subject.favorite)
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
          alt={`subject ${subject.subjectId}`}
          height={height}
          src={subjectURL}
          width={width}
        />
      </Anchor>
      <TalkLink
        href={href}
      />
      <FavouritesButton
        checked={isFavourite}
        disabled={!isLoggedIn}
        onClick={toggleFavourite}
      />
      <CollectionsButton
        disabled={!isLoggedIn}
        onClick={addToCollections}
      />
    </Box>
  )
}

SubjectPreview.propTypes = {
  className: string,
  height: number,
  isLoggedIn: bool,
  subject: shape({
    favorite: bool,
    id: string,
    toggleFavourite: func,
    locations: array
  }),
  slug: string.isRequired,
  width: number
}

SubjectPreview.defaultProps = {
  height: 250,
  isLoggedIn: false,
  subject: {
    favorite: false,
    id: '',
    toggleFavorite: () => false,
    locations: []
  },
  width: 400
}

export default SubjectPreview
