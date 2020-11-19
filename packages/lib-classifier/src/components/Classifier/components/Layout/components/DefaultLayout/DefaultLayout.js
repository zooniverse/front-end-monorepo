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

const columnSize = pxToRem(380)

const ContainerGrid = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-areas: "viewer task";
  position: relative;

  @media (min-width: 701px) {
    grid-template-columns: 8fr ${columnSize};
  }

  @media screen and (max-width: 700px) {
    grid-template-columns: 100%;
    grid-template-rows: auto auto;
    grid-auto-flow: column;
    grid-gap: 20px;
    grid-template-areas: "viewer" "task";
  }
`

const StyledTaskAreaContainer = styled.div`
  grid-area: task;
`

const StyledTaskArea = styled(TaskArea)`
  position: sticky;
  top: 10px;
`

const ViewerGrid = styled.section`
  display: grid;
  grid-area: viewer;
  grid-template-columns: auto 4.5rem;
  grid-template-areas: "subject toolbar" "metatools ...";
`

const StyledImageToolbarContainer = styled.div`
  grid-area: toolbar;
`

const StyledImageToolbar = styled(ImageToolbar)`
  position: sticky;
  top: 10px;
`

const StyledMetaTools = styled(MetaTools)`
  grid-area: metatools;
  margin-top: 10px;
`

function DefaultLayout (props) {
  return (
    <ContainerGrid className={props.className}>
      <ViewerGrid>
        <Box gridArea='subject'>
          <Banners />
          <SubjectViewer />
        </Box>
        <StyledImageToolbarContainer>
          <StyledImageToolbar />
        </StyledImageToolbarContainer>
        <StyledMetaTools />
      </ViewerGrid>
      <StyledTaskAreaContainer>
        <StyledTaskArea />
      </StyledTaskAreaContainer>
      <FeedbackModal />
    </ContainerGrid>
  )
}

export default DefaultLayout
