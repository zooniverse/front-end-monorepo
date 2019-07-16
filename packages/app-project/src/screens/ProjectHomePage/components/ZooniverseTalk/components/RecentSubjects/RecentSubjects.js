import counterpart from 'counterpart'
import { arrayOf, shape, string } from 'prop-types'
import React from 'react'
import { Box, Grid } from 'grommet'
import { SpacedText } from '@zooniverse/react-components'
import styled from 'styled-components'

const StyledSpacedText = styled(SpacedText)`
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
`

// TODO: Use the subject viewers from the classifier
function RecentSubjects (props) {
  const { className, subjects } = props
  return (
    <Grid
      className={className}
      columns={['1fr', '1fr', '1fr']}
      fill
      gap='small'
    >
      {subjects.map(subject => (
        <Box background='brand' elevation='small' justify='end' pad='small'>
          <StyledSpacedText color='white' weight='bold'>
            {counterpart('RecentSubjects.subjectLabel', { id: subject.id })}
          </StyledSpacedText>
        </Box>
      ))}
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
