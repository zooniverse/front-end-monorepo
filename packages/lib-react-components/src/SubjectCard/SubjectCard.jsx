import { Anchor, Box } from 'grommet'
import mime from 'mime/lite'
import { node, oneOf, shape, string, arrayOf, objectOf, object } from 'prop-types'
import styled from 'styled-components'

import { useTranslation } from '../translations/i18n'
import Media from '../Media'
import MetadataIconButton from '../MetadataIconButton'
import FavoritesIconButton from '../FavoritesIconButton'
import CollectIconButton from '../CollectIconButton'
import ShareIconButton from '../ShareIconButton'
import addQueryParams from './helpers/addQueryParams'

const METATOOLS_HEIGHT = 45

const StyledSubjectCard = styled(Box)`
  position: relative;
`

const StyledImageLink = styled(Anchor)`
  display: block;
  text-decoration: none;
  width: 100%;

  &:hover {
    text-decoration: none;
  }
`

const StyledPreview = styled(Box)`
  overflow: hidden;
  position: relative;
`

const StyledBackground = styled(Box)`
  filter: blur(12px);
  inset: 0;
  position: absolute;
  transform: scale(1.2); // scale up the background to hide edges created by the blur
  z-index: 0;
`

const StyledForegroundMedia = styled(Media)`
  position: relative;
  z-index: 1;
`

const StyledTitle = styled(Box)`
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);
  bottom: 0;
  height: 72px;
  left: 0;
  position: absolute;
  right: 0;
  text-align: center;
  z-index: 2;
`

const StyledTitleText = styled.span`
  color: ${props => props.theme.global.colors.white};
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.8px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
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
  login,
  placeholder,
  projectId,
  projectSlug,
  size = 'large',
  subject = DEFAULT_SUBJECT,
  userId
}) {
  const { t } = useTranslation()
  const subjectIdTitle = t('SubjectCard.subjectId', { id: subject.id })
  const linkTitle = t('SubjectCard.linkTitle', { id: subject.id })

  // layout
  const width = cardWidth(size)
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
  const subjectTalkUrl = `${origin}${subjectTalkHref}`

  return (
    <StyledSubjectCard
      elevation='small'
      flex={false}
      height={`${cardHeight}px`}
      round='8px'
      width={`${width}px`}
    >
      <StyledImageLink
        a11yTitle={linkTitle}
        href={subjectTalkHref}
      >
        <StyledPreview
          height={`${previewHeight}px`}
          round={{ corner: 'top', size: '8px' }}
          width={`${width}px`}
        >
          {mediaSrc && showBackground ? (
            <StyledBackground>
              <Media
                alt=''
                controls={false}
                fit='cover'
                height={previewHeight}
                placeholder={placeholder}
                src={mediaSrc}
                width={width}
                aria-hidden='true'
                tabIndex={-1}
              />
            </StyledBackground>
          ) : null}

          {mediaSrc ? (
            <StyledForegroundMedia
              alt={subjectIdTitle}
              controls={false}
              fit='contain'
              placeholder={placeholder}
              height={previewHeight}
              src={mediaSrc}
              width={width}
            />
          ) : null}

          <StyledTitle
            align='center'
            direction='row'
            gap='xsmall'
            justify='center'
            pad={{ horizontal: 'small', vertical: 'medium' }}
          >
            <StyledTitleText>
              {subjectIdTitle}
            </StyledTitleText>
          </StyledTitle>
        </StyledPreview>
      </StyledImageLink>

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
