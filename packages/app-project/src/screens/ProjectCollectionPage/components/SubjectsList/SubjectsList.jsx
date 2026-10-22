import { SubjectCard } from '@zooniverse/react-components'
import { arrayOf, number, object, string } from 'prop-types'
import styled from 'styled-components'

const StyledSubjectList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 30px;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
`

function SubjectsList({
  login,
  projectId,
  projectSlug,
  subjects = [],
  userId
}) {
  return (
    <StyledSubjectList>
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
  login: string,
  projectId: string,
  projectSlug: string,
  subjects: arrayOf(object),
  userId: string
}

export default SubjectsList
