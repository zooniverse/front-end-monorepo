import React from 'react'
import styled from 'styled-components'
import { pxToRem } from '@zooniverse/react-components'
import { Box } from 'grommet'

import Banners from '../../../Banners'
import FeedbackModal from '../../../Feedback'
import ImageToolbar from '../../../ImageToolbar'
import MetaTools from '../../../MetaTools'
import SubjectViewer from '../../../SubjectViewer'
import TaskArea from '../../../TaskArea'

const ContainerGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-areas: "viewer task";
  overflow: hidden;
  position: relative;

  @media (min-width: 701px) {
    grid-template-columns: 8fr ${pxToRem(380)};
  }

  @media screen and (max-width: 700px) {
    grid-template-columns: 100%;
    grid-template-rows: auto auto;
    grid-auto-flow: column;
    grid-template-areas: "viewer" "task";
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

const StyledImageToolbar = styled(ImageToolbar)`
  grid-area: toolbar;
`

const StyledMetaTools = styled(MetaTools)`
  grid-area: metatools;
`

const StyledBox = styled(Box)`
  position: relative;
`

function DefaultLayout (props) {
  return (
    <ContainerGrid className={props.className}>
      <ViewerGrid>
        <StyledBox gridArea='subject'>
          <SubjectViewer />
          <Banners />
        </StyledBox>
        <StyledImageToolbar />
        <StyledMetaTools />
      </ViewerGrid>
      <StyledTaskArea />
      <FeedbackModal />
    </ContainerGrid>
  )
}

export default DefaultLayout
