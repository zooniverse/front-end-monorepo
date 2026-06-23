import { SubjectCard } from '@zooniverse/react-components'
import { arrayOf, shape, string } from 'prop-types'
import { Box } from 'grommet'

function RecentSubjects({
  className,
  login,
  projectId,
  projectSlug,
  subjects = [],
  size,
  userId
}) {
  return (
    <Box
      className={className}
      direction='row'
      fill='horizontal'
      gap='small'
      justify='evenly'
      pad='small'
      overflow='auto'
    >
      {subjects.map(subject => (
        <SubjectCard
          key={subject.id}
          login={login}
          projectId={projectId}
          projectSlug={projectSlug}
          size={size}
          subject={subject}
          userId={userId}
        />
      ))}
    </Box>
  )
}

RecentSubjects.propTypes = {
  /** CSS class. */
  className: string,
  /** Current user login. */
  login: string,
  /** Project ID */
  projectId: string,
  /** Project slug */
  projectSlug: string.isRequired,
  /** ResponsiveContext size */
  size: string,
  /** Recent subjects from the Talk API. */
  subjects: arrayOf(shape({
    id: string
  })),
  /** Current user ID */
  userId: string
}

export default RecentSubjects
