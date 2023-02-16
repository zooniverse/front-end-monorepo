import styled from 'styled-components'
import { Box } from 'grommet'
import { observer } from 'mobx-react'
import { useStores } from '@hooks'

import Banners from '@components/Classifier/components/Banners'
import FeedbackModal from '@components/Classifier/components/Feedback'
import ImageToolbar from '@components/Classifier/components/ImageToolbar'
import MetaTools from '@components/Classifier/components/MetaTools'
import QuickTalk from '@components/Classifier/components/QuickTalk'
import SubjectViewer from '@components/Classifier/components/SubjectViewer'
import TaskArea from '@components/Classifier/components/TaskArea'
import FieldGuide from '@components/Classifier/components/FieldGuide'

function storeMapper(store) {
  const { flipbookViewMode } = store.subjectViewer

  return {
    flipbookViewMode
  }
}

const ContainerGrid = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-areas: 'viewer task';
  grid-template-columns: auto 25.333rem;
  position: relative;

  @media screen and (max-width: 1160px) {
    grid-gap: 1.75rem;
    grid-template-columns: 45.333fr 25.333fr;
  }

  // this breakpoint matches Grommet's ResponsiveContext component
  @media screen and (max-width: 768px) {
    grid-template-columns: 100%;
    grid-template-rows: auto auto;
    grid-auto-flow: column;
    grid-gap: 20px;
    grid-template-areas: 'viewer' 'task';
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
  grid-template-areas: 'subject toolbar';
  grid-template-columns: auto clamp(3rem, 10%, 4.5rem);
  height: fit-content;
`

const StyledImageToolbarContainer = styled.div`
  grid-area: toolbar;
`

const StyledImageToolbar = styled(Box)`
  height: min-content;
  position: sticky;
  top: 10px;
`

function MultiFrameLayout({ className = '' }) {
  const { flipbookViewMode } = useStores(storeMapper)

  return (
    <ContainerGrid className={className}>
      <ViewerGrid>
        <Box gridArea='subject'>
          <Banners />
          <SubjectViewer />
          <MetaTools />
        </Box>
        {flipbookViewMode !== 'separate' && (
          <StyledImageToolbarContainer>
            <StyledImageToolbar>
              <ImageToolbar />
              <FieldGuide />
            </StyledImageToolbar>
          </StyledImageToolbarContainer>
        )}
      </ViewerGrid>
      <StyledTaskAreaContainer>
        <StyledTaskArea />
      </StyledTaskAreaContainer>
      <FeedbackModal />
      <QuickTalk />
    </ContainerGrid>
  )
}

export default observer(MultiFrameLayout)
