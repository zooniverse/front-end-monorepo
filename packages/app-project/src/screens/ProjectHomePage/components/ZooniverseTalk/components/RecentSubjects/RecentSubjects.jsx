import { arrayOf, shape, string } from 'prop-types'
import { Grid } from 'grommet'
import SubjectThumbnail from './components/SubjectThumbnail'

// TODO: Use the subject viewers from the classifier
function RecentSubjects ({
  className,
  href,
  subjects = []
}) {
  const height = 200
  const width = 270
  return (
    <Grid
      className={className}
      columns={['1fr', '1fr', '1fr']}
      fill
      gap='small'
    >
      {subjects.map(subject => (
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
  /** CSS class. */
  className: string,
  /** Base href for subject links */
  href: string.isRequired,
  /** Recent subjects from the Talk API. */
  subjects: arrayOf(shape({
    id: string
  })).isRequired
}

export default RecentSubjects
