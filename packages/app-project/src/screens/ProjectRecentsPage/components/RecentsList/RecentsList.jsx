import { Grid } from 'grommet'
import { SubjectCard } from '@zooniverse/react-components'
import { arrayOf, shape, string } from 'prop-types'
import styled from 'styled-components'

const StyledGrid = styled(Grid)`
  width: 100%;
  justify-items: center;

  /* Default for screens <= 430px: 1 column */
  grid-template-columns: repeat(1, 1fr);

  /* 768px and wider: 2 columns */
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  /* 1024px and wider: 3 columns */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  /* 1920px and wider: 4 columns */
  @media (min-width: 1920px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

function RecentsList({
  login,
  projectId,
  projectSlug,
  recents = [],
  userId
}) {
  return (
    <StyledGrid
      fill='horizontal'
      gap={{ column: '20px', row: '30px' }}
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
    </StyledGrid>
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
