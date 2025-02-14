import styled, { css } from 'styled-components'
import { Box, Grid } from 'grommet'

import Banners from '@components/Classifier/components/Banners'
import FeedbackModal from '@components/Classifier/components/Feedback'
import MetaTools from '@components/Classifier/components/MetaTools'
import QuickTalk from '@components/Classifier/components/QuickTalk'
import SubjectViewer from '@components/Classifier/components/SubjectViewer'
import TaskArea from '@components/Classifier/components/TaskArea'
import FieldGuide from '@components/Classifier/components/FieldGuide'
import {
  ViewerGrid,
  StyledSubjectContainer,
  StyledImageToolbarContainer,
  StyledImageToolbar,
  StyledTaskAreaContainer,
  StyledTaskArea
} from '../shared/StyledContainers'

const ContainerGrid = styled(Grid)`
  position: relative;
  grid-gap: 1.875rem;
  grid-template-areas: 'viewer task';
  grid-template-columns: auto ${props => (props.hasSurveyTask ? '33.75rem' : '25rem')};

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

export default function NoMaxWidth({
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
        <ViewerGrid forwardedAs='section'>
          <StyledSubjectContainer hasSurveyTask={hasSurveyTask}>
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
