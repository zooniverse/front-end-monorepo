import { SubjectCard } from '@zooniverse/react-components'
import { arrayOf, shape, string } from 'prop-types'
import styled from 'styled-components'

const StyledFlex = styled.ul`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  column-gap: 20px;
  row-gap: 30px;
`

function RecentsList({
  login,
  projectId,
  projectSlug,
  recents = [],
  userId
}) {
  return (
    <StyledFlex>
      {recents.map(recent => (
        <li key={recent.id}>
          <SubjectCard
            interactive={true}
            login={login}
            projectId={projectId}
            projectSlug={projectSlug}
            subject={recent.subject}
            userId={userId}
          />
        </li>
      ))}
    </StyledFlex>
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
