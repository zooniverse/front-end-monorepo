import { useContext } from 'react'
import styled, { css } from 'styled-components'
import { Box, ResponsiveContext } from 'grommet'

import Banners from '@components/Classifier/components/Banners'
import FeedbackModal from '@components/Classifier/components/Feedback'
import ImageToolbar from '@components/Classifier/components/ImageToolbar'
import MetaTools from '@components/Classifier/components/MetaTools'
import QuickTalk from '@components/Classifier/components/QuickTalk'
import SubjectViewer from '@components/Classifier/components/SubjectViewer'
import TaskArea from '@components/Classifier/components/TaskArea'
import FieldGuide from '@components/Classifier/components/FieldGuide'

export const Relative = styled(Box)`
  position: relative; // Used for QuickTalk and FeedbackModal positioning
`

const StickySubjectViewer = styled(Box)`
  ${props =>
    props.size !== 'small' &&
    css`
      position: sticky;
      top: 10px;
    `}
`

const StickyTaskArea = styled(Box)`
  flex: initial; // Don't stretch vertically
  ${props =>
    props.size !== 'small' &&
    css`
      position: sticky;
      top: 10px;
    `}
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

export default function CenteredLayout({
  separateFramesView = false,
  hasSurveyTask = false
}) {
  const size = useContext(ResponsiveContext)
  const containerProps = size === 'small' ? verticalLayout : horizontalLayout
  const taskAreaWidth = hasSurveyTask ? '33.75rem' : '25rem'

  return (
    <Relative>
      <Box {...containerProps}>
        <Box
          as='section'
          direction='row'
          margin={size === 'small' ? 'auto' : 'none'}
        >
          <StickySubjectViewer size={size}>
            <Banners />
            <SubjectViewer />
            <MetaTools />
          </StickySubjectViewer>
          {!separateFramesView && (
            <Box width='3rem' fill='vertical' style={{ minWidth: '3rem' }}>
              <StickyImageToolbar />
            </Box>
          )}
        </Box>
        <StickyTaskArea
          width={size === 'small' ? '100%' : taskAreaWidth}
          fill={size === 'small' ? 'horizontal' : 'vertical'}
          size={size}
        >
          <TaskArea />
          {separateFramesView && <FieldGuide />}
        </StickyTaskArea>
      </Box>
      <FeedbackModal />
      <QuickTalk />
    </Relative>
  )
}
