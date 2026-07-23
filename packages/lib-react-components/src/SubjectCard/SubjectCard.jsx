import { Anchor, Box } from 'grommet'
import mime from 'mime/lite'
import { arrayOf, bool, node, object, objectOf, oneOf, shape, string } from 'prop-types'
import styled from 'styled-components'

import { useTranslation } from '../translations/i18n'
import MetadataIconButton from '../MetadataIconButton'
import FavoritesIconButton from '../FavoritesIconButton'
import CollectIconButton from '../CollectIconButton'
import ShareIconButton from '../ShareIconButton'
import addQueryParams from './helpers/addQueryParams'

import StaticMedia from './components/StaticMedia'
import InteractiveMedia from './components/InteractiveMedia'

const INTERACTIVE_WIDTH = 300
const METATOOLS_HEIGHT = 45

const StyledSubjectCard = styled(Box)`
  position: relative;
`

const StyledMediaLink = styled(Anchor)`
  display: block;
  text-decoration: none;
  width: 100%;

  &:hover {
    text-decoration: none;
  }
`

function cardWidth(size) {
  switch (size) {
    case 'small':
      return 160
    case 'medium':
      return 189
    case 'large':
      return 220
    default:
      return 220
  }
}

function metaToolsGap(size) {
  switch (size) {
    case 'small':
      return 'none'
    case 'medium':
      return '10px'
    case 'large':
      return '15px'
    default:
      return '15px'
  }
}

const DEFAULT_SUBJECT = {
  id: '',
  locations: [],
  metadata: {}
}

function SubjectCard({
  interactive = false,
  login,
  placeholder,
  projectId,
  projectSlug,
  size = 'large',
  subject = DEFAULT_SUBJECT,
  userId
}) {
  const { t } = useTranslation()
  const subjectIdTitle = t('SubjectCard.subjectId', { id: subject?.id })
  const linkTitle = t('SubjectCard.linkTitle', { id: subject?.id })

  // layout
  const width = interactive ? INTERACTIVE_WIDTH : cardWidth(size)
  const cardHeight = width + METATOOLS_HEIGHT
  const previewHeight = width
  const metaToolsSectionGap = metaToolsGap(size)

  // subject properties
  const { locations, metadata } = subject
  const mediaSrc = locations?.[0] ? Object.values(locations[0])[0] : null
  const mimeType = mediaSrc ? mime.getType(mediaSrc) : null
  const [ mediaType ] = mimeType ? mimeType.split('/') : []
  const showBackground = mediaType === 'image' || mediaType === 'video'
  const subjectTalkHref = addQueryParams(`/projects/${projectSlug}/talk/subjects/${subject.id}`)
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const subjectTalkUrl = subjectTalkHref ? `${origin}${subjectTalkHref}` : undefined

  return (
    <StyledSubjectCard
      elevation='small'
      flex={false}
      height={`${cardHeight}px`}
      round='8px'
      width={`${width}px`}
    >
      <StyledMediaLink
        a11yTitle={linkTitle}
        href={subjectTalkHref}
      >
        {interactive ? (
          <InteractiveMedia
            placeholder={placeholder}
            previewHeight={previewHeight}
            subject={subject}
            subjectIdTitle={subjectIdTitle}
            width={width}
          />
        ) : (
          <StaticMedia
            placeholder={placeholder}
            previewHeight={previewHeight}
            subject={subject}
            subjectIdTitle={subjectIdTitle}
            width={width}
          />
        )}
      </StyledMediaLink>
      <Box
        align='center'
        background={{ dark: 'dark-3', light: 'white' }}
        direction='row'
        gap={metaToolsSectionGap}
        height={`${METATOOLS_HEIGHT}px`}
        justify='center'
        round={{ corner: 'bottom', size: '8px' }}
      >
        <MetadataIconButton metadata={metadata} />
        <FavoritesIconButton
          disabled={!login}
          login={login}
          projectId={projectId}
          projectSlug={projectSlug}
          subjectId={subject?.id}
        />
        <CollectIconButton
          disabled={!login}
          projectId={projectId}
          subjectId={subject?.id}
          userId={userId}
        />
        <ShareIconButton shareUrl={subjectTalkUrl} />
      </Box>
    </StyledSubjectCard>
  )
}

SubjectCard.propTypes = {
  interactive: bool,
  login: string,
  placeholder: node,
  projectId: string,
  projectSlug: string.isRequired,
  size: oneOf(['large', 'medium', 'small']),
  subject: shape({
    id: string.isRequired,
    locations: arrayOf(objectOf(string)),
    metadata: object
  }),
  userId: string
}

export default SubjectCard
