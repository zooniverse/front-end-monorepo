import PropTypes from 'prop-types'
import { Anchor, Box } from 'grommet'
import { Media, SpacedText } from '@zooniverse/react-components'
import styled, { css } from 'styled-components'
import { useTranslation } from 'next-i18next'

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
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
`

function SubjectThumbnail ({ height, href, width, subject }) {
  const { t } = useTranslation('screens')
  const subjectURLs = subject.locations.map(location => Object.values(location)[0])
  const subjectURL = subjectURLs[0]
  return (
    <Anchor
      href={`${href}/subjects/${subject.id}`}
    >
      <StyledBox
        elevation='small'
        fill
        maxHeight={height}
        justify='top'
        pad='none'
        maxWidth={width}
      >
        <Media
          alt={`subject ${subject.id}`}
          height={700}
          src={subjectURL}
          width={700}
        />
        <StyledSpacedText color='white' weight='bold'>
          {t('Home.ZooniverseTalk.RecentSubjects.subjectLabel', { id: subject.id })}
        </StyledSpacedText>
      </StyledBox>
    </Anchor>
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

SubjectThumbnail.defaultProps = {
}

export default SubjectThumbnail
