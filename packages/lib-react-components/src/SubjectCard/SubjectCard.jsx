import { Anchor, Box } from 'grommet'
import { arrayOf, bool, node, object, objectOf, oneOf, shape, string } from 'prop-types'
import styled from 'styled-components'

import { useTranslation } from '../translations/i18n'
import MetadataIconButton from '../MetadataIconButton'
import FavoritesIconButton from '../FavoritesIconButton'
import CollectIconButton from '../CollectIconButton'
import ShareIconButton from '../ShareIconButton'

import StaticMedia from './components/StaticMedia'
import InteractiveMedia from './components/InteractiveMedia'

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
  const width = cardWidth(size)
  const cardHeight = width + METATOOLS_HEIGHT
  const previewHeight = width
  const metaToolsSectionGap = metaToolsGap(size)

  // subject properties
  const { metadata } = subject
  const subjectTalkHref = (projectSlug && subject?.id) ? `/projects/${projectSlug}/talk/subjects/${subject.id}` : undefined
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
    id: string,
    locations: arrayOf(objectOf(string)),
    metadata: object
  }),
  userId: string
}

export default SubjectCard
