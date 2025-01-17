import styled, { css } from 'styled-components'
import { Box, Grid } from 'grommet'

import Banners from '@components/Classifier/components/Banners'
import FeedbackModal from '@components/Classifier/components/Feedback'
import ImageToolbar from '@components/Classifier/components/ImageToolbar'
import MetaTools from '@components/Classifier/components/MetaTools'
import QuickTalk from '@components/Classifier/components/QuickTalk'
import SubjectViewer from '@components/Classifier/components/SubjectViewer'
import TaskArea from '@components/Classifier/components/TaskArea'
import FieldGuide from '@components/Classifier/components/FieldGuide'

const ContainerGrid = styled(Grid)`
  position: relative;
  grid-gap: 1.875rem;
  grid-template-areas: 'viewer task';
  grid-template-columns: auto ${props => (props.hasSurveyTask ? '33.75rem' : '25rem')};
  justify-content: center;

  ${props => props.hasSurveyTask ? css`
    @media screen and (min-width: 769px) and (max-width: 70rem) {
      grid-gap: 1.25rem;
      grid-template-areas:
        'viewer'
        'task';
      grid-template-columns: 100%;
      grid-template-rows: auto auto;
      margin: 0;
    }
  ` : css`
    @media screen and (min-width: 769px) and (max-width: 70rem) {
      grid-gap: 1.25rem;
      grid-template-areas: 'viewer task';
      grid-template-columns: 9fr 5fr;
    }
  `}

  @media screen and (max-width: 768px) {
    grid-gap: 1.25rem;
    grid-template-areas:
      'viewer'
      'task';
    grid-template-columns: 100%;
    grid-template-rows: auto auto;
    margin: 0;
  }
`

export const ViewerGrid = styled(Grid)`
  ${props => props.hasSurveyTask
    ? css`
        @media screen and (min-width: 70rem) {
          position: sticky;
          top: 10px;
        }
      ` 
    : css`
        @media screen and (min-width: 769px) {
          position: sticky;
          top: 10px;
        }
      `}
  height: fit-content;
  grid-area: viewer;
  grid-template-columns: auto clamp(3rem, 10%, 4.5rem);
  grid-template-rows: auto;
  grid-template-areas: 'subject toolbar';
`

const StyledSubjectContainer = styled(Box)`
  grid-area: subject;
  position: sticky;
`

const StyledImageToolbarContainer = styled.div`
  grid-area: toolbar;
`

const StyledImageToolbar = styled(ImageToolbar)`
  position: sticky;
  top: 10px;
`

const StyledTaskAreaContainer = styled.div`
  grid-area: task;
`

const StyledTaskArea = styled(Box)`
  ${props => props.hasSurveyTask ? css`
    @media screen and (min-width: 70rem) {
      position: sticky;
      top: 10px;
    }
  ` : css`
    @media screen and (min-width: 769px) {
      position: sticky;
      top: 10px;
    }
  `}
`

export default function CenteredLayout({
  className = '',
  separateFramesView = false,
  hasSurveyTask = false
}) {
  return (
    <ContainerGrid
      className={className}
      hasSurveyTask={hasSurveyTask}
    >
      {separateFramesView ? (
        <Box>
          <Banners />
          <SubjectViewer />
          <MetaTools />
        </Box>
      ) : (
        <ViewerGrid
          forwardedAs='section'
          hasSurveyTask={hasSurveyTask}
        >
          <StyledSubjectContainer>
            <Banners />
            <SubjectViewer />
            <MetaTools />
          </StyledSubjectContainer>
          <StyledImageToolbarContainer>
            <StyledImageToolbar />
          </StyledImageToolbarContainer>
        </ViewerGrid>
      )}
      <StyledTaskAreaContainer>
        <StyledTaskArea hasSurveyTask={hasSurveyTask}>
          <TaskArea />
          {separateFramesView && <FieldGuide />}
        </StyledTaskArea>
      </StyledTaskAreaContainer>
      <FeedbackModal />
      <QuickTalk />
    </ContainerGrid>
  )
}
