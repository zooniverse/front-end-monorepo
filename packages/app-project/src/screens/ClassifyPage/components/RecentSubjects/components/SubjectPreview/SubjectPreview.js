import counterpart from 'counterpart'
import { array, bool, shape, string } from 'prop-types'
import React, { useState } from 'react'
import { Media } from '@zooniverse/react-components'
import { CollectionsButton, FavouritesButton, TalkLink } from './components'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function SubjectPreview ({ recent }) {
  const subjectURLs = recent.locations.map(location => Object.values(location)[0])
  const subjectURL = subjectURLs[0]
  const [ checked, setChecked ] = useState(recent.favorite)

  function toggleFavorite () {
    recent.toggleFavorite()
    setChecked(recent.favorite)
  }

  return (
    <div>
      <Media
        alt={`subject ${recent.subjectId}`}
        height={350}
        src={subjectURL}
        width={400}
      />
      <TalkLink />
      <FavouritesButton
        checked={recent.favorite}
        onClick={toggleFavorite}
      />
      <CollectionsButton />
    </div>
  )
}

SubjectPreview.propTypes = {
  recent: shape({
    favorite: bool,
    subjectId: string,
    locations: array
  })
}

SubjectPreview.defaultProps = {
  recent: {
    favorite: false,
    subjectId: '',
    locations: []
  }
}

export default SubjectPreview
