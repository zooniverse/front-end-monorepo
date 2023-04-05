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
  position: relative; // Used for QuickTalk and FeedbackModal positioning
`

const StickyTaskArea = styled(TaskArea)`
  flex: initial; // Don't stretch vertically
  position: sticky;
  top: 10px;
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

export default function CenteredLayout({ separateFramesView = false }) {
  const size = useContext(ResponsiveContext)
  const containerProps = size === 'small' ? verticalLayout : horizontalLayout

  return (
    <Relative>
      <Box {...containerProps}>
        <Box
          as='section'
          direction='row'
          margin={size === 'small' ? 'auto' : 'none'}
        >
          <Box>
            <Banners />
            <SubjectViewer />
            <MetaTools />
          </Box>
          {!separateFramesView && (
            <Box width='3rem' fill='vertical' style={{ minWidth: '3rem' }}>
              <StickyImageToolbar />
            </Box>
          )}
        </Box>
        <Box
          width={size === 'small' ? '100%' : '25rem'}
          fill={size === 'small' ? 'horizontal' : 'vertical'}
        >
          <StickyTaskArea />
        </Box>
      </Box>
      <FeedbackModal />
      <QuickTalk />
    </Relative>
  )
}
