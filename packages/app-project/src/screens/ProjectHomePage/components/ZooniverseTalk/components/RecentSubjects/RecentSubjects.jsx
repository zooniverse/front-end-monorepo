import { SubjectCard } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import styled from 'styled-components'

const StyledBox = styled(Box)`
  list-style: none;
  scroll-snap-type: x mandatory;

  li {
    scroll-snap-align: start;
  }
`

function RecentSubjects({
  login,
  projectId,
  projectSlug,
  subjects = [],
  userId
}) {
  return (
    <StyledBox
      forwardedAs='ul'
      direction='row'
      gap='small'
      justify='between'
      pad={{ horizontal: 'xxsmall', bottom: 'xsmall', top: 'xxsmall' }}
      overflow={{ horizontal: 'auto' }}
      tabIndex={0}
      margin='0'
    >
      {subjects.map(subject => (
        <li key={subject.id}>
          <SubjectCard
            login={login}
            projectId={projectId}
            projectSlug={projectSlug}
            size='medium'
            subject={subject}
            userId={userId}
          />
        </li>
      ))}
    </StyledBox>
  )
}

RecentSubjects.propTypes = {
  /** Current user login. */
  login: string,
  /** Project ID */
  projectId: string,
  /** Project slug */
  projectSlug: string.isRequired,
  /** Recent subjects from the Talk API. */
  subjects: arrayOf(shape({
    id: string
  })),
  /** Current user ID */
  userId: string
}

export default RecentSubjects
