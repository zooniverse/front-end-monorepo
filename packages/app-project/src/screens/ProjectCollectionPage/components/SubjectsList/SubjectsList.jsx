import { SubjectCard } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { arrayOf, bool, object, string } from 'prop-types'
import styled from 'styled-components'

const StyledSubjectList = styled.ul`
  position: relative;
  column-gap: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  row-gap: 30px;
  width: 100%;
`

const StyledBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  opacity: 0.4;
`

function LoadingOverlay() {
  return (
    <StyledBox
      aria-hidden='true'
      background={{ light: 'neutral-6', dark: 'dark-3' }}
      fill
    />
  )
}

function SubjectsList({
  isLoading = false,
  login,
  projectId,
  projectSlug,
  subjects = [],
  userId
}) {
  return (
    <StyledSubjectList aria-busy={isLoading}>
      {isLoading ? <LoadingOverlay /> : null}
      {subjects.map(subject => (
        <li key={subject.id}>
          <SubjectCard
            interactive={true}
            login={login}
            projectId={projectId}
            projectSlug={projectSlug}
            subject={subject}
            userId={userId}
          />
        </li>
      ))}
    </StyledSubjectList>
  )
}

SubjectsList.propTypes = {
  isLoading: bool,
  login: string,
  projectId: string,
  projectSlug: string,
  subjects: arrayOf(object),
  userId: string
}

export default SubjectsList
