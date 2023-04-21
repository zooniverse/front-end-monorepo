import { useContext } from 'react'
import styled from 'styled-components'
import { Box, Grid, ResponsiveContext } from 'grommet'

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

  // proportional 9:5 subject/task sizing up to a maximum subject/task width of 45rem/25rem, then the Grommet Grid columns take over
  @media screen and (min-width: 769px) and (max-width: 70rem) {
    grid-gap: 1.75rem;
    grid-template-columns: 9fr 5fr;
  }
`

const StyledTaskAreaContainer = styled.div`
  grid-area: task;
`

const StyledTaskArea = styled(Box)`
  position: sticky;
  top: 10px;
`

const StyledImageToolbarContainer = styled.div`
  grid-area: toolbar;
`

const StyledImageToolbar = styled(ImageToolbar)`
  position: sticky;
  top: 10px;
`

export function ViewerGrid({ children }) {
  return (
    <Grid
      as='section'
      areas={[['subject', 'toolbar']]}
      columns={['auto', 'clamp(3rem, 10%, 4.5rem)']}
      gridArea='viewer'
      height='fit-content'
      rows={['auto']}
    >
      {children}
    </Grid>
  )
}

export default function NoMaxWidth({
  className = '',
  separateFramesView = false
}) {
  const size = useContext(ResponsiveContext)
  const verticalLayout = {
    areas: [['viewer'], ['task']],
    columns: ['100%'],
    gap: 'small',
    margin: 'none',
    rows: ['auto', 'auto']
  }
  const horizontalLayout = {
    areas: [['viewer', 'task']],
    columns: ['auto', '25rem'],
    gap: 'medium',
    rows: ['auto']
  }
  const containerGridProps =
    size === 'small' ? verticalLayout : horizontalLayout

  return (
    <ContainerGrid className={className} {...containerGridProps}>
      {separateFramesView ? (
        <Box>
          <Banners />
          <SubjectViewer />
          <MetaTools />
        </Box>
      ) : (
        <ViewerGrid>
          <Box gridArea='subject'>
            <Banners />
            <SubjectViewer />
            <MetaTools />
          </Box>
          <StyledImageToolbarContainer>
            <StyledImageToolbar />
          </StyledImageToolbarContainer>
        </ViewerGrid>
      )}
      <StyledTaskAreaContainer>
        <StyledTaskArea>
          <TaskArea />
          {separateFramesView && <FieldGuide />}
        </StyledTaskArea>
      </StyledTaskAreaContainer>
      <FeedbackModal />
      <QuickTalk />
    </ContainerGrid>
  )
}
