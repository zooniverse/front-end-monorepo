import { Grid } from 'grommet'
import { SubjectCard } from '@zooniverse/react-components'
import { arrayOf, shape, string } from 'prop-types'

function RecentsList({
  login,
  projectId,
  projectSlug,
  recents = [],
  userId
}) {
  return (
    <Grid
      columns={{ count: 'fit', size: '300px' }}
      fill="horizontal"
      gap={{ column: '20px', row: '30px' }}
      margin={{ horizontal: 'small', vertical: 'xsmall' }}
    >
      {recents.map(recent => (
        <SubjectCard
          key={recent.id}
          interactive={true}
          login={login}
          projectId={projectId}
          projectSlug={projectSlug}
          subject={recent.subject}
          userId={userId}
        />
      ))}
    </Grid>
  )
}

RecentsList.propTypes = {
  /** Current user login. */
  login: string,
  /** Project ID */
  projectId: string,
  /** Project slug */
  projectSlug: string,
  /** Recents from the Panoptes API, each with a linked subject. */
  recents: arrayOf(shape({
    id: string,
    subject: shape({
      id: string
    })
  })),
  /** Current user ID */
  userId: string
}

export default RecentsList
