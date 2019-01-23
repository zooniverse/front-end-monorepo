import React from 'react'
import styled from 'styled-components'

import ImageToolbar from '../../../ImageToolbar'
import MetaTools from '../../../MetaTools'
import SubjectViewer from '../../../SubjectViewer'
import TaskArea from '../../../TaskArea'

const ContainerGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  position: relative;

  @media (min-width: 700px) {
    grid-template-columns: 8fr 5fr;
  }
`

const ViewerGrid = styled.section`
  display: grid;
  grid-template-columns: auto 4.5rem;
  grid-template-areas: "subject toolbar" "metatools ...";
`

const StyledSubjectViewer = styled(SubjectViewer)`
  grid-area: subject;
`

const StyledImageToolbar = styled(ImageToolbar)`
  grid-area: toolbar;
`

const StyledMetaTools = styled(MetaTools)`
  grid-area: metatools;
`

function DefaultLayout () {
  return (
    <ContainerGrid>
      <ViewerGrid>
        <StyledSubjectViewer />
        <StyledImageToolbar />
        <StyledMetaTools />
      </ViewerGrid>
      <TaskArea />
    </ContainerGrid>
  )
}

export default DefaultLayout
