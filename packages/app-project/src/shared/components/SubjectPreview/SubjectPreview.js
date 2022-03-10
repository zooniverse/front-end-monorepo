import { array, bool, func, node, shape, string } from 'prop-types'
import { createRef } from 'react'
import { Anchor, Box } from 'grommet'
import { FavouritesButton, Media } from '@zooniverse/react-components'
import { CollectionsButton, TalkLink } from './components'
import { useRouter } from 'next/router'

const defaultSubject = {
  favorite: false,
  id: '',
  toggleFavorite: () => false,
  locations: []
}
function SubjectPreview ({
  height = '250px',
  isLoggedIn = false,
  placeholder,
  slug,
  subject = defaultSubject,
  width = '400px'
}) {
  const subjectURLs = subject.locations.map(location => Object.values(location)[0])
  const subjectURL = subjectURLs[0]
  const collectionsModal = createRef()
  const href = `/projects/${slug}/talk/subjects/${subject.id}`
  const { locale } = useRouter()

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
      <Box direction='column' gap='xsmall' pad={{ vertical: 'xsmall' }}>
        <TalkLink
          href={href}
        />
        <FavouritesButton
          checked={subject.favorite}
          disabled={!isLoggedIn}
          locale={locale}
          onClick={subject.toggleFavourite}
        />
        <CollectionsButton
          disabled={!isLoggedIn}
          subject={subject}
        />
      </Box>
    </Box>
  )
}

SubjectPreview.propTypes = {
  /** CSS classes */
  className: string,
  /** CSS box height */
  height: string,
  /** Is the volunteer logged in, for favourites and collections. */
  isLoggedIn: bool,
  /** Placeholder, shown while the subject loads. */
  placeholder: node,
  /** The current subject */
  subject: shape({
    favorite: bool,
    id: string,
    toggleFavourite: func,
    locations: array
  }),
  /** Project URL slug for links. */
  slug: string.isRequired,
  /** CSS box width */
  width: string
}

export default SubjectPreview
