import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'
import { Anchor, Box } from 'grommet'
import { Media, SpacedText } from '@zooniverse/react-components'
import styled from 'styled-components'

import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledBox = styled(Box)`
  position: relative;
`
const StyledSpacedText = styled(SpacedText)`
  bottom: 1em;
  left: 1em;
  position: absolute;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
`

function SubjectThumbnail ({ height, href, width, subject }) {
  const subjectURLs = subject.locations.map(location => Object.values(location)[0])
  const subjectURL = subjectURLs[0]
  return (
    <Anchor
      href={`${href}/subjects/${subject.id}`}
    >
      <StyledBox
        background='brand'
        elevation='small'
        fill
        justify='end'
        pad='none'
      >
        <Media
          alt={`subject ${subject.id}`}
          height={height}
          src={subjectURL}
          width={width}
        />
        <StyledSpacedText color='white' weight='bold'>
          {counterpart('RecentSubjects.subjectLabel', { id: subject.id })}
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
