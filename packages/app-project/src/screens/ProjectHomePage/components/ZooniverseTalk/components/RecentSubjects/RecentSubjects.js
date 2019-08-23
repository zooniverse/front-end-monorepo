import counterpart from 'counterpart'
import { arrayOf, shape, string } from 'prop-types'
import React from 'react'
import { Grid } from 'grommet'
import SubjectThumbnail from './components/SubjectThumbnail'


// TODO: Use the subject viewers from the classifier
function RecentSubjects (props) {
  const { className, href, subjects } = props
  const height = 200
  const width = 300
  return (
    <Grid
      className={className}
      columns={['1fr', '1fr', '1fr']}
      fill
      gap='small'
    >
      {subjects.map( subject => (
        <SubjectThumbnail
          key={subject.id}
          height={height}
          href={href}
          subject={subject}
          width={width}
        />
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
