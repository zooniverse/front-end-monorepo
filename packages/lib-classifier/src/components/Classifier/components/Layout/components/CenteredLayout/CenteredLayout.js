import styled, { css } from 'styled-components'
import { Box } from 'grommet'

import Banners from '@components/Classifier/components/Banners'
import FeedbackModal from '@components/Classifier/components/Feedback'
import MetaTools from '@components/Classifier/components/MetaTools'
import QuickTalk from '@components/Classifier/components/QuickTalk'
import SubjectViewer from '@components/Classifier/components/SubjectViewer'
import TaskArea from '@components/Classifier/components/TaskArea'
import FieldGuide from '@components/Classifier/components/FieldGuide'

import {
  StyledImageToolbar,
  StyledSubjectContainer
} from '../shared/StyledContainers'

const Relative = styled(Box)`
  position: relative; // Used for QuickTalk and FeedbackModal positioning
`

const ContainerBox = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;

  ${props => props.hasSurveyTask && css`
    @media screen and (min-width: 769px) and (max-width: 70rem) {
      flex-direction: column;
    }
  `}

  // small screens
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

const ViewBox = styled(Box)`
  flex-direction: row;
`

const StyledImageToolbarContainer = styled.div`
  min-width: 3rem;
  width: 3rem;
`

const StickyTaskArea = styled(Box)`
  height: fit-content;
  position: sticky;
  top: 10px;
  min-width: ${props => props.hasSurveyTask ? '33.75rem' : 'auto'};
  width: ${props => props.hasSurveyTask ? '33.75rem' : '25rem'};

  ${props => props.hasSurveyTask && css`
    @media screen and (min-width: 769px) and (max-width: 70rem) {
      position: static;
      width: 100%;
    }
  `}

  // small screens
  @media screen and (max-width: 768px) {
    position: static;
    width: 100%;
  }
`

export default function CenteredLayout({
  separateFramesView = false,
  hasSurveyTask = false
}) {
  return (
    <Relative>
      <ContainerBox hasSurveyTask={hasSurveyTask}>
        <ViewBox forwardedAs='section'>
          <StyledSubjectContainer hasSurveyTask={hasSurveyTask}>
            <Banners />
            <SubjectViewer />
            <MetaTools />
          </StyledSubjectContainer>
          {!separateFramesView && (
            <StyledImageToolbarContainer>
              <StyledImageToolbar />
            </StyledImageToolbarContainer>
          )}
        </ViewBox>
        <StickyTaskArea hasSurveyTask={hasSurveyTask}>
          <TaskArea />
          {separateFramesView && <FieldGuide />}
        </StickyTaskArea>
      </ContainerBox>
      <FeedbackModal />
      <QuickTalk />
    </Relative>
  )
}
