import { SubjectCard } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { arrayOf, bool, func, object, string } from 'prop-types'
import styled from 'styled-components'

import getCoverSubjectId from '../../helpers/getCoverSubjectId'

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
  defaultSubjectSrc,
  isLoading = false,
  isSettingCover = false,
  login,
  onSetCover = null,
  projectId,
  projectSlug,
  subjects = [],
  userId
}) {
  const coverSubjectId = getCoverSubjectId(subjects, defaultSubjectSrc)

  const showOverlay = isLoading || isSettingCover

  return (
    <StyledSubjectList aria-busy={showOverlay}>
      {showOverlay ? <LoadingOverlay /> : null}
      {subjects.map(subject => (
        <li key={subject.id}>
          <SubjectCard
            interactive={true}
            isCover={subject.id === coverSubjectId}
            login={login}
            onSetCover={onSetCover}
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
  defaultSubjectSrc: string,
  isLoading: bool,
  isSettingCover: bool,
  login: string,
  onSetCover: func,
  projectId: string,
  projectSlug: string,
  subjects: arrayOf(object),
  userId: string
}

export default SubjectsList
