import React from 'react'
import styled from 'styled-components'
import { pxToRem } from '@zooniverse/react-components'
import { Box } from 'grommet'

import { withStores } from '@helpers'
import Banners from '@components/Classifier/components/Banners'
import FeedbackModal from '@components/Classifier/components/Feedback'
import ImageToolbar from '@components/Classifier/components/ImageToolbar'
import MetaTools from '@components/Classifier/components/MetaTools'
import QuickTalk from '@components/Classifier/components/QuickTalk'
import SubjectViewer from '@components/Classifier/components/SubjectViewer'
import TaskArea from '@components/Classifier/components/TaskArea'

const ContainerGrid = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-areas: "viewer task";
  grid-template-columns: auto 25.333rem;
  position: relative;

  @media screen and (max-width: 1160px) {
    grid-gap: 1.75rem;
    grid-template-columns: 45.333fr 25.333fr;
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

export const ViewerGrid = styled.section`
  display: grid;
  grid-area: viewer;
  grid-template-columns: auto 4.5rem;
  grid-template-areas: "subject toolbar" "metatools ...";
`

export const StyledImageToolbarContainer = styled.div`
  grid-area: toolbar;
`

export const StyledImageToolbar = styled(ImageToolbar)`
  position: sticky;
  top: 10px;
`

const StyledMetaTools = styled(MetaTools)`
  grid-area: metatools;
  margin-top: 10px;
`

export default function DefaultLayout({
  className = '',
  project
}) {
  return (
    <ContainerGrid className={className}>
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
      <QuickTalk />
    </ContainerGrid>
  )
}
