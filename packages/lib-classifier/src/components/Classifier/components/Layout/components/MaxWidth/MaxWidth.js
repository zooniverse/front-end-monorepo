import styled, { css } from 'styled-components'
import { Box, Grid } from 'grommet'
import { Suspense } from 'react'

import Banners from '@components/Classifier/components/Banners'
import FeedbackModal from '@components/Classifier/components/Feedback'
import ImageToolbar from '@components/Classifier/components/ImageToolbar'
import MetaTools from '@components/Classifier/components/MetaTools'
import QuickTalk from '@components/Classifier/components/QuickTalk'
import SubjectViewer from '@components/Classifier/components/SubjectViewer'
import TaskArea from '@components/Classifier/components/TaskArea'
import FieldGuide from '@components/Classifier/components/FieldGuide'

export const ContainerGrid = styled(Grid)`
  position: relative;
  grid-gap: 1.875rem;
  grid-template-areas: 'viewer task';
  grid-template-columns: minmax(auto, 100rem) ${props =>
      props.hasSurveyTask ? '33.75rem' : '25rem'};
  margin: auto;

  ${props =>
    props.hasSurveyTask
      ? css`
          @media screen and (min-width: 769px) and (max-width: 70rem) {
            grid-gap: 1.25rem;
            grid-template-areas:
              'viewer'
              'task';
            grid-template-columns: 100%;
            grid-template-rows: auto auto;
            margin: 0;
          }
        `
      : css`
          // proportional 9:5 subject/task sizing up to a maximum subject/task width of 45rem/25rem
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
  ${props =>
    props.hasSurveyTask
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

const StyledTaskAreaContainer = styled.div`
  grid-area: task;
`

const StyledTaskArea = styled(Box)`
  ${props =>
    props.hasSurveyTask
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
`

const StyledImageToolbarContainer = styled.div`
  grid-area: toolbar;
`

const StyledImageToolbar = styled(ImageToolbar)`
  position: sticky;
  top: 10px;
`

export default function MaxWidth({
  className = '',
  separateFramesView = false,
  hasSurveyTask = false
}) {
  return (
    <ContainerGrid className={className} hasSurveyTask={hasSurveyTask}>
      {separateFramesView ? (
        <Box>
          <Banners />
          <Suspense fallback={<div>Loading</div>}>
            <SubjectViewer />
          </Suspense>
          <MetaTools />
        </Box>
      ) : (
        <ViewerGrid forwardedAs='section' hasSurveyTask={hasSurveyTask}>
          <Box gridArea='subject'>
            <Banners />
            <Suspense fallback={<div>Loading</div>}>
              <SubjectViewer />
            </Suspense>
            <MetaTools />
          </Box>
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
