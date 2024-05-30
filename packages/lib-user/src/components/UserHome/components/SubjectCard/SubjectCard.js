/* This component will eventually be moved to lib-react-components to be a universal card including
    - Subject image or screenshot
    - Subject id
    - Metadata info button
    - Favorite button
    - Add to collections button
    - Share button with link to Talk url
*/

/* There's a similar component in app-project ProjectHomePage > RecentSubjects */

import styled, { css } from 'styled-components'
import { Anchor, Box } from 'grommet'
import { Media, SpacedText } from '@zooniverse/react-components'
import { shape, string } from 'prop-types'

const StyledAnchor = styled(Anchor)`
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

const Gradient = styled(Box)`
  top: 0;
  right: 0;
  position: absolute;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) -30%,
    rgba(0, 0, 0, 0.2) 30%,
    transparent 100%
  );
  z-index: 2; // Must be in front of Grommet Video component's z-index of 1
`

const StyledSpacedText = styled(SpacedText)`
  bottom: 1em;
  left: 1em;
  position: absolute;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 3;
`

export default function SubjectCard({ subject }) {
  const subjectMedia = subject.locations.map(location => Object.values(location)[0])
  const mediaSrc = subjectMedia[0]

  // to PFE
  const href = `https://www.zooniverse.org/projects/${subject.slug}/talk/subjects/${subject.id}`

  return (
    <StyledAnchor href={href}>
      <StyledBox elevation='small' fill
      // maxHeight={height}
      // maxWidth={width}
      >
        <Media
          alt={`subject ${subject.id}`}
          controls={false}
          // height={700}
          src={mediaSrc}
          // width={700}
        />
        <Gradient fill />
        <StyledSpacedText color='white' weight='bold'>
          {'Subject ' + subject.id}
        </StyledSpacedText>
      </StyledBox>
    </StyledAnchor>
  )
}

SubjectCard.propTypes = {
  subject: shape({
    id: string,
    slug: string
  }).isRequired
}
