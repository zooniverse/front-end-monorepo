import { SubjectCard } from '@zooniverse/react-components'
import { arrayOf, shape, string } from 'prop-types'
import { Box, Carousel } from 'grommet'

function RecentSubjectsCarousel({
  className,
  login,
  projectId,
  projectSlug,
  subjects = [],
  userId
}) {
  return (
    <Carousel
      className={className}
      controls='arrows'
      fill
    >
      {subjects.map(subject => (
        <Box
          key={subject.id}
          align='center'
          justify='center'
          pad='small'
        >
          <SubjectCard
            login={login}
            projectId={projectId}
            projectSlug={projectSlug}
            size='small'
            subject={subject}
            userId={userId}
          />
        </Box>
      ))}
    </Carousel>
  )
}

RecentSubjectsCarousel.propTypes = {
  /** CSS class. */
  className: string,
  /** Current user login. */
  login: string,
  /** Project ID */
  projectId: string,
  /** Project slug */
  projectSlug: string.isRequired,
  /** Recent subjects from the Talk API. */
  subjects: arrayOf(shape({
    id: string
  })).isRequired,
  /** Current user ID */
  userId: string
}

export default RecentSubjectsCarousel
