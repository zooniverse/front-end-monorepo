import { Box } from 'grommet'
import { arrayOf, bool, func, node, object, objectOf, oneOf, shape, string } from 'prop-types'
import styled from 'styled-components'

import { useTranslation } from '../translations/i18n'
import MetadataIconButton from '../MetadataIconButton'
import FavoritesIconButton from '../FavoritesIconButton'
import CollectIconButton from '../CollectIconButton'
import ShareIconButton from '../ShareIconButton'
import addQueryParams from '../helpers/addQueryParams'

import CollectionCoverBanner from './components/CollectionCoverBanner'
import InteractiveMedia from './components/InteractiveMedia'
import SimpleMedia from './components/SimpleMedia'
import SubjectCheckbox from './components/SubjectCheckbox'

const INTERACTIVE_WIDTH = 300
const METATOOLS_HEIGHT = 45

const StyledSubjectCard = styled(Box)`
  position: relative;
  z-index: 0;

  &:hover button[data-set-cover],
  &:focus-within button[data-set-cover] {
    opacity: 1;
  }
`

const StyledSelectCheckbox = styled(Box)`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 3;
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
  isCover = false,
  login,
  onSelect = null,
  onSetCover = null,
  placeholder,
  projectId,
  projectSlug,
  selectable = false,
  selected = false,
  size = 'large',
  subject = DEFAULT_SUBJECT,
  userId
}) {
  const { t } = useTranslation()
  const subjectIdTitle = t('SubjectCard.subjectId', { id: subject.id })
  const linkTitle = t('SubjectCard.linkTitle', { subjectId: subjectIdTitle })

  // layout
  const width = interactive ? INTERACTIVE_WIDTH : cardWidth(size)
  const cardHeight = width + METATOOLS_HEIGHT
  const previewHeight = width
  const metaToolsSectionGap = metaToolsGap(size)

  // subject properties
  const { metadata } = subject
  const subjectTalkHref = addQueryParams(`/projects/${projectSlug}/talk/subjects/${subject.id}`)
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const subjectTalkUrl = `${origin}${subjectTalkHref}`

  return (
    <StyledSubjectCard
      elevation='small'
      flex={false}
      height={`${cardHeight}px`}
      round='8px'
      width={`${width}px`}
    >
      {interactive ? (
        <InteractiveMedia
          linkTitle={linkTitle}
          placeholder={placeholder}
          previewHeight={previewHeight}
          subject={subject}
          subjectIdTitle={subjectIdTitle}
          width={width}
          url={subjectTalkUrl}
        />
      ) : (
        <SimpleMedia
          linkTitle={linkTitle}
          placeholder={placeholder}
          previewHeight={previewHeight}
          subject={subject}
          subjectIdTitle={subjectIdTitle}
          width={width}
          url={subjectTalkUrl}
        />
      )}
      <CollectionCoverBanner
        isCover={isCover}
        onSetCover={onSetCover ? () => onSetCover(subject) : null}
      />
      {selectable ? (
        <StyledSelectCheckbox>
          <SubjectCheckbox
            a11yTitle={t('SubjectCard.selectSubject', { subjectId: subjectIdTitle })}
            checked={selected}
            onChange={event => onSelect?.(subject, event.target.checked)}
          />
        </StyledSelectCheckbox>
      ) : null}
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
          subjectId={subject.id}
        />
        <CollectIconButton
          disabled={!login}
          projectId={projectId}
          subjectId={subject.id}
          userId={userId}
        />
        <ShareIconButton shareUrl={subjectTalkUrl} />
      </Box>
    </StyledSubjectCard>
  )
}

SubjectCard.propTypes = {
  interactive: bool,
  isCover: bool,
  login: string,
  onSelect: func,
  onSetCover: func,
  placeholder: node,
  projectId: string,
  projectSlug: string.isRequired,
  selectable: bool,
  selected: bool,
  size: oneOf(['large', 'medium', 'small']),
  subject: shape({
    id: string.isRequired,
    locations: arrayOf(objectOf(string)),
    metadata: object
  }),
  userId: string
}

export default SubjectCard
