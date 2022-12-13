import styled from 'styled-components'
import { Box } from 'grommet'
import { useEffect, useRef } from 'react'

import { useStores } from '@hooks'
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
  grid-template-columns: auto min-content;
  grid-template-areas: "subject toolbar" "metatools ...";
`

const StyledMetaTools = styled(MetaTools)`
  grid-area: metatools;
  margin-top: 10px;
`

function storeMapper(store) {
  const {
    setViewerWidth
  } = store.subjectViewer

  return {
    setViewerWidth
  }
}

export default function DefaultLayout({ className = '' }) {
  const { setViewerWidth } = useStores(storeMapper)
  const viewerContainer = useRef(null)
  const resizeObserver = useRef(null)

  /** DefaultLayout for classify page styling has breakpoints at 700px and 1160px.
   * In its components such as FlipbookControls & ImageToolbar, we're simply checking for
   * when viewer grid-area is < 550px which happens both before and after the two layout breakpoints
   */
  useEffect(() => {
    resizeObserver.current = new window.ResizeObserver((entries) => {
      if (entries[0].contentRect.width < 550) {
        setViewerWidth('small')
      } else {
        setViewerWidth('default')
      }
    })

    if (viewerContainer.current) {
      resizeObserver.current.observe(viewerContainer.current)
    }

    return () => {
      if (viewerContainer.current) {
        resizeObserver.current.unobserve(viewerContainer.current)
      }
    }
  }, [])

  return (
    <ContainerGrid className={className}>
      <ViewerGrid ref={viewerContainer}>
        <Box gridArea='subject'>
          <Banners />
          <SubjectViewer />
        </Box>
        <ImageToolbar />
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
