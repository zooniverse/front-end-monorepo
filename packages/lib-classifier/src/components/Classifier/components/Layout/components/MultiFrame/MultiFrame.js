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
import { ContainerGrid, horizontalLayout, verticalLayout } from '../MaxWidth/MaxWidth.js'

const StyledTaskAreaContainer = styled.div`
  grid-area: task;
`

const StyledTaskArea = styled(TaskArea)`
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

// columns in ViewerGrid will change based on whether its a "separate frames" view or not
function ViewerGrid({ children }) {
  return (
    <Grid
      as='section'
      areas={[
        ['subject', 'toolbar']
      ]}
      columns={['auto', 'clamp(3rem, 10%, 4.5rem)']}
      gridArea='viewer'
      height='fit-content'
      rows={['auto']}
    >
      {children}
    </Grid>
  )
}

export default function MultiFrame({ className = '' }) {
  const size = useContext(ResponsiveContext)
  const containerGridProps = size === 'small' ? verticalLayout : horizontalLayout

  return (
    <ContainerGrid
      className={className}
      {...containerGridProps}
    >
      <ViewerGrid>
        <Box gridArea='subject'>
          <Banners />
          <SubjectViewer />
          <MetaTools />
        </Box>
        <StyledImageToolbarContainer>
          {/** ImageToolbar will be hidden here when "separate frames" view is being displayed */}
          <StyledImageToolbar />
        </StyledImageToolbarContainer>
      </ViewerGrid>
      <StyledTaskAreaContainer>
        <StyledTaskArea />
      </StyledTaskAreaContainer>
      <FeedbackModal />
      <QuickTalk />
    </ContainerGrid>
  )
}
