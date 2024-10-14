/* This component will eventually be moved to lib-react-components to be a universal card including
    - Subject image or screenshot
    - Subject id
    - Metadata info button
    - Favorite button
    - Add to collections button
    - Share button with link to Talk url
*/

/* The shape and styling of this component is similar to ProjectCard in lib-react-components */

import styled from 'styled-components'
import { Anchor, Box } from 'grommet'
import { Media, SpacedText } from '@zooniverse/react-components'
import { string } from 'prop-types'

const StyledBox = styled(Box)`
  overflow: hidden;
  position: relative;
  text-decoration: none;
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

function cardWidth(size) {
  switch (size) {
    case 'small':
      return 157
    case 'medium':
      return 189
    case 'large':
      return 220
    case 'xlarge':
      return 252
    default:
      return 189
  }
}

export default function SubjectCard({
  size = 'medium',
  mediaSrc = '',
  projectSlug = '',
  subjectID
}) {
  // to PFE
  const href = `https://www.zooniverse.org/projects/${projectSlug}/talk/subjects/${subjectID}`

  return (
    <StyledBox
      forwardedAs='a'
      elevation='small'
      height={`${(cardWidth(size) * 14) / 11}px`}
      href={href}
      width={`${cardWidth(size)}px`}
      round='8px'
    >
      <Media
        alt={`subject ${subjectID}`}
        controls={false}
        src={mediaSrc}
        width={cardWidth(size) * 2}
      />
      <Gradient fill />
      <StyledSpacedText color='white' weight='bold'>
        {'Subject ' + subjectID}
      </StyledSpacedText>
    </StyledBox>
  )
}

SubjectCard.propTypes = {
  size: string,
  projectSlug: string,
  mediaSrc: string,
  subjectID: string.isRequired
}
