import counterpart from 'counterpart'
import { arrayOf, shape, string } from 'prop-types'
import React from 'react'
import { Anchor, Box, Grid } from 'grommet'
import { Media, SpacedText } from '@zooniverse/react-components'
import styled from 'styled-components'


const StyledBox = styled(Box)`
  position: relative;
`
const StyledSpacedText = styled(SpacedText)`
  bottom: 1em;
  left: 1em;
  position: absolute;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
`

// TODO: Use the subject viewers from the classifier
function RecentSubjects (props) {
  const { className, href, subjects } = props
  const height=200
  const width=300
  return (
    <Grid
      className={className}
      columns={['1fr', '1fr', '1fr']}
      fill
      gap='small'
    >
      {subjects.map(subject => {
        const subjectURLs = subject.locations.map(location => Object.values(location)[0])
        const subjectURL = subjectURLs[0]
        return (
          <Anchor
            key={subject.id}
            href={`${href}/subjects/${subject.id}`}
          >
            <StyledBox background='brand' elevation='small' justify='end' pad='none'>
              <Media
                alt={`subject ${subject.id}`}
                className={className}
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
      })}
    </Grid>
  )
}

RecentSubjects.propTypes = {
  subjects: arrayOf(shape({
    id: string
  }))
}

RecentSubjects.defaultProps = {
}

export default RecentSubjects
