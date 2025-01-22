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

export const Relative = styled(Box)`
  position: relative; // Used for QuickTalk and FeedbackModal positioning
`

const ContainerBox = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 1.25rem;
  justify-content: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin: 0;
  }
`

const ViewBox = styled(Box)`
  display: flex;
  flex-direction: row;
  margin: 0;

  @media screen and (max-width: 768px) {
    margin: auto;
  }
`

const StickyTaskArea = styled(Box)`
  flex: initial; // Don't stretch vertically
  width: 100%;
  
  @media screen and (min-width: 769px) {
    height: 100%;
    position: sticky;
    top: 10px;
    width: ${props => props.hasSurveyTask ? '33.75rem' : '25rem'};
  }
`

export default function CenteredLayout({
  separateFramesView = false,
  hasSurveyTask = false
}) {
  return (
    <Relative>
      <ContainerBox>
        <ViewBox forwardedAs='section'>
          <StyledSubjectContainer>
            <Banners />
            <SubjectViewer />
            <MetaTools />
          </StyledSubjectContainer>
          {!separateFramesView && (
            <Box
              width='3rem'
              fill='vertical'
              style={{ minWidth: '3rem' }}
            >
              <StyledImageToolbar />
            </Box>
          )}
        </ViewBox>
        <StickyTaskArea
          hasSurveyTask={hasSurveyTask}
        >
          <TaskArea />
          {separateFramesView && <FieldGuide />}
        </StickyTaskArea>
      </ContainerBox>
      <FeedbackModal />
      <QuickTalk />
    </Relative>
  )
}
