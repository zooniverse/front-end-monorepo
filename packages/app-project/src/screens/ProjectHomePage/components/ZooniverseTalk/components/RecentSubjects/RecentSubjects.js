import counterpart from 'counterpart'
import { arrayOf, shape, string } from 'prop-types'
import React from 'react'
import { Anchor, Box, Grid } from 'grommet'
import { Media } from '@zooniverse/react-components'
import styled from 'styled-components'

// TODO: Use the subject viewers from the classifier
function RecentSubjects (props) {
  const { className, href, subjects } = props
  const height=200
  const width=200
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
            <Box background='brand' elevation='small' justify='end' pad='none'>
              <Media
                alt={`subject ${subject.id}`}
                className={className}
                height={height}
                src={subjectURL}
                width={width}
              />
            </Box>
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
