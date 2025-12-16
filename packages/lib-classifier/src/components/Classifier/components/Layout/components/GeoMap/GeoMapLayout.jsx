import styled from 'styled-components'
import { Box } from 'grommet'
import Banners from '@components/Classifier/components/Banners'
import FeedbackModal from '@components/Classifier/components/Feedback'
import MetaTools from '@components/Classifier/components/MetaTools'
import QuickTalk from '@components/Classifier/components/QuickTalk'
import SubjectViewer from '@components/Classifier/components/SubjectViewer'
import TaskArea from '@components/Classifier/components/TaskArea'
import FieldGuide from '@components/Classifier/components/FieldGuide'

const Relative = styled(Box)`
  position: relative; // Used for QuickTalk and FeedbackModal positioning
`

const ContainerBox = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 20px;

  // small screens
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

const GeoMapSubjectContainer = styled(Box)`
  height: 100%;
  width: 100%;
`

const GeoMapViewerContainer = styled(Box)`
  height: 600px;
  width: 100%;

  @media screen and (max-width: 768px) {
    height: 400px;
  }
`

const StickyTaskArea = styled(Box)`
  height: fit-content;
  min-width: auto;
  position: sticky;
  top: 10px;
  width: 20rem;

  // small screens
  @media screen and (max-width: 768px) {
    min-width: auto;
    position: static;
    width: 100%;
  }
`

export default function GeoMapLayout() {
  return (
    <Relative>
      <ContainerBox>
        <GeoMapSubjectContainer forwardedAs='section'>
          <Banners />
          <GeoMapViewerContainer>
            <SubjectViewer />
          </GeoMapViewerContainer>
          <MetaTools />
        </GeoMapSubjectContainer>
        <StickyTaskArea>
          <TaskArea />
          <FieldGuide />
        </StickyTaskArea>
      </ContainerBox>
      <FeedbackModal />
      <QuickTalk />
    </Relative>
  )
}
