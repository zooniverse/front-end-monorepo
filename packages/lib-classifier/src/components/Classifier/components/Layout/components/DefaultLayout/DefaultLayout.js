import React from 'react'
import styled from 'styled-components'
import { pxToRem } from '@zooniverse/react-components'

import ImageToolbar from '../../../ImageToolbar'
import MetaTools from '../../../MetaTools'
import SubjectViewer from '../../../SubjectViewer'
import TaskArea from '../../../TaskArea'

const ContainerGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-areas: "viewer task";
  position: relative;

  @media (min-width: 701px) {
    grid-template-columns: 8fr ${pxToRem(380)};
  }

  @media screen and (max-width: 700px) {
    grid-template-columns: 100%;
    grid-template-rows: auto auto;
    grid-auto-flow: column;
  }
`

const StyledTaskArea = styled(TaskArea)`
  grid-area: task;
`

const ViewerGrid = styled.section`
  display: grid;
  grid-area: viewer;
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
      <StyledTaskArea />
    </ContainerGrid>
  )
}

export default DefaultLayout
