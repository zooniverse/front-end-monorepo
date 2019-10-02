import counterpart from 'counterpart'
import { array, bool, func, node, number, shape, string } from 'prop-types'
import React from 'react'
import { Anchor, Box } from 'grommet'
import { Media } from '@zooniverse/react-components'
import { CollectionsButton, FavouritesButton, TalkLink } from './components'


import en from './locales/en'

counterpart.registerTranslations('en', en)

function SubjectPreview ({ height, isLoggedIn, placeholder, subject, slug, width }) {
  const subjectURLs = subject.locations.map(location => Object.values(location)[0])
  const subjectURL = subjectURLs[0]
  const collectionsModal = React.createRef()
  const href = `/projects/${slug}/talk/subjects/${subject.id}`

  return (
    <Box
      fill
    >
      <Anchor
        href={href}
      >
        <Box
          align='center'
          height={height}
          overflow='hidden'
          width={width}
        >
          <Media
            alt={`subject ${subject.id}`}
            height={700}
            placeholder={placeholder}
            src={subjectURL}
            width={700}
          />
        </Box>
      </Anchor>
      <TalkLink
        href={href}
      />
      <FavouritesButton
        checked={subject.favorite}
        disabled={!isLoggedIn}
        onClick={subject.toggleFavourite}
      />
      <CollectionsButton
        disabled={!isLoggedIn}
        subject={subject}
      />
    </Box>
  )
}

SubjectPreview.propTypes = {
  className: string,
  height: string,
  isLoggedIn: bool,
  placeholder: node,
  subject: shape({
    favorite: bool,
    id: string,
    toggleFavourite: func,
    locations: array
  }),
  slug: string.isRequired,
  width: string
}

SubjectPreview.defaultProps = {
  height: '250px',
  isLoggedIn: false,
  subject: {
    favorite: false,
    id: '',
    toggleFavorite: () => false,
    locations: []
  },
  width: '400px'
}

export default SubjectPreview
