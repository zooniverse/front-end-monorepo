import { Anchor, Box } from 'grommet'
import { useTranslation } from 'next-i18next'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Media, SpacedText } from '@zooniverse/react-components'

export const StyledAnchor = styled(Anchor)`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`

const StyledBox = styled(Box)`
  ${props => css`
    max-height: ${props.maxHeight}px;
    max-width: ${props.maxWidth}px;
  `}
  overflow: hidden;
  position: relative;
`

const StyledSpacedText = styled(SpacedText)`
  bottom: 1em;
  left: 1em;
  position: absolute;
  text-shadow: 1px 1px 1px rgba(0,0,0,1), 1px 0 4px rgba(0,0,0,0.8);
  z-index: 2; // Must be in front of Grommet Video component's z-index of 1
`

function SubjectThumbnail ({ height, href, width, subject }) {
  const { t } = useTranslation('screens')
  const subjectURLs = subject.locations.map(location => Object.values(location)[0])
  const subjectURL = subjectURLs[0]
  return (
    <StyledAnchor
      href={`${href}/subjects/${subject.id}`}
    >
      <StyledBox
        elevation='small'
        fill
        maxHeight={height}
        maxWidth={width}
      >
        <Media
          alt={`subject ${subject.id}`}
          controls={false}
          height={700}
          src={subjectURL}
          width={700}
        />
        <StyledSpacedText color='white' weight='bold'>
          {t('Home.ZooniverseTalk.RecentSubjects.subjectLabel', { id: subject.id })}
        </StyledSpacedText>
      </StyledBox>
    </StyledAnchor>
  )
}

SubjectThumbnail.propTypes = {
  height: PropTypes.number.isRequired,
  href: PropTypes.string.isRequired,
  subject: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  width: PropTypes.number.isRequired
}

export default SubjectThumbnail
