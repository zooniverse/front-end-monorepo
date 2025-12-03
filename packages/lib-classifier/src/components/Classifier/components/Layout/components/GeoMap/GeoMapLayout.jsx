import styled from 'styled-components'
import { Box } from 'grommet'
import Banners from '@components/Classifier/components/Banners'
import FeedbackModal from '@components/Classifier/components/Feedback'
import MetaTools from '@components/Classifier/components/MetaTools'
import QuickTalk from '@components/Classifier/components/QuickTalk'
import SubjectViewer from '@components/Classifier/components/SubjectViewer'
import TaskArea from '@components/Classifier/components/TaskArea'
import { StyledSubjectContainer } from '../shared/StyledContainers'
import FieldGuide from '@components/Classifier/components/FieldGuide'

const Relative = styled(Box)`
  position: relative; // Used for QuickTalk and FeedbackModal positioning
`

const ContainerBox = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;

  .metatools-centered {
    justify-content: center;
  }

  // small screens
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

const ViewBox = styled(Box)`
  flex-direction: row;
  width: 100%;
`

const GeoMapSubjectContainer = styled(StyledSubjectContainer)`
  width: 100%;
`

const StickyTaskArea = styled(Box)`
  height: fit-content;
  position: sticky;
  top: 10px;
  min-width: auto;
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
        <ViewBox forwardedAs='section'>
          <GeoMapSubjectContainer>
            <Banners />
            <SubjectViewer />
            <MetaTools className='metatools-centered' />
          </GeoMapSubjectContainer>
        </ViewBox>
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
