import { useContext } from 'react'
import styled from 'styled-components'
import { Box, ResponsiveContext } from 'grommet'

import Banners from '@components/Classifier/components/Banners'
import FeedbackModal from '@components/Classifier/components/Feedback'
import ImageToolbar from '@components/Classifier/components/ImageToolbar'
import MetaTools from '@components/Classifier/components/MetaTools'
import QuickTalk from '@components/Classifier/components/QuickTalk'
import SubjectViewer from '@components/Classifier/components/SubjectViewer'
import TaskArea from '@components/Classifier/components/TaskArea'

export const Relative = styled(Box)`
  position: relative;
  border: solid red 1px;
`

const TaskAreaContainer = styled.div``

const StickyTaskArea = styled(TaskArea)`
  position: sticky;
  top: 10px;
`

const ImageToolbarContainer = styled.div`
  width: 3rem;
`

const StickyImageToolbar = styled(ImageToolbar)`
  position: sticky;
  top: 10px;
`

export const verticalLayout = {
  direction: 'column',
  gap: 'medium',
  margin: 'none'
}

export const horizontalLayout = {
  direction: 'row',
  gap: 'small',
  justify: 'center'
}

export default function CenteredLayout() {
  const size = useContext(ResponsiveContext)
  const containerProps = size === 'small' ? verticalLayout : horizontalLayout

  return (
    <Relative>
      <Box {...containerProps}>
        <Box
          as='section'
          direction='row'
          margin={size === 'small' ? 'auto' : 'none'}
          style={{ border: '1px solid blue' }}
        >
          <Box>
            <Banners />
            <SubjectViewer />
            <MetaTools />
          </Box>
          <ImageToolbarContainer>
            <StickyImageToolbar />
          </ImageToolbarContainer>
        </Box>
        <TaskAreaContainer>
          <StickyTaskArea />
        </TaskAreaContainer>
      </Box>
      <FeedbackModal />
      <QuickTalk />
    </Relative>
  )
}
