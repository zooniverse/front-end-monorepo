import { observer } from 'mobx-react'
import { Box, Grid } from 'grommet'
import PropTypes from 'prop-types'
import asyncStates from '@zooniverse/async-states'
import { useEffect, useRef, useState } from 'react'

import { useStores } from '@hooks'
import locationValidator from '../../helpers/locationValidator'
import SeparateFrame from './components/SeparateFrame/SeparateFrame.js'
import ViewModeButton from './components/ViewModeButton/ViewModeButton.js'

function storeMapper(store) {
  const {
    limit_subject_height: limitSubjectHeight,
    multi_image_layout: multiImageLayout
  } = store.workflows?.active?.configuration

  return {
    limitSubjectHeight,
    multiImageLayout
  }
}

const DEFAULT_HANDLER = () => true
const minFrameWidth = 300

function SeparateFramesViewer({
  enableInteractionLayer = false,
  loadingState = asyncStates.initialized,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject
}) {
  const {
    limitSubjectHeight,
    multiImageLayout
  } = useStores(storeMapper)

  const [forceColLayout, setForceColLayout] = useState(false)
  const [numFramesHorizontally, setNumFramesHorizontally] = useState(1)

  useEffect(() => {
    if (multiImageLayout === 'row') {
      setNumFramesHorizontally(subject?.locations?.length)
    } else if (multiImageLayout === 'grid2') {
      setNumFramesHorizontally(2)
    } else if (multiImageLayout === 'grid3') {
      setNumFramesHorizontally(3)
    }
  }, [multiImageLayout])

  const framesContainer = useRef(null)
  const resizeObserver = useRef(null)

  useEffect(() => {
    const tooSmallContainerWidth = numFramesHorizontally * minFrameWidth
    resizeObserver.current = new window.ResizeObserver(entries => {
      if (entries[0].contentRect.width < tooSmallContainerWidth) {
        setForceColLayout(true)
      } else {
        setForceColLayout(false)
      }
    })

    if (framesContainer.current) {
      resizeObserver.current.observe(framesContainer.current)
    }

    return () => {
      if (framesContainer.current) {
        resizeObserver.current.unobserve(framesContainer.current)
      }
    }
  }, [numFramesHorizontally])

  if (loadingState === asyncStates.error || !subject?.locations) {
    return <div>Something went wrong.</div>
  }

  return (
    <div ref={framesContainer}>
      <Grid
        gap='xsmall'
        columns={forceColLayout ? 'auto' : [`repeat(${numFramesHorizontally}, 1fr)`]}
        rows='auto'
      >
        {subject.locations?.map((location, index) => (
          <SeparateFrame
            key={location.url}
            enableInteractionLayer={enableInteractionLayer}
            frame={index}
            frameUrl={location.url}
            limitSubjectHeight={limitSubjectHeight}
            onError={onError}
            onReady={onReady}
            subject={subject}
          />
        ))}
      </Grid>
      <Box justify='center' pad='xsmall'>
        <ViewModeButton />
      </Box>
    </div>
  )
}

export default observer(SeparateFramesViewer)

SeparateFramesViewer.propTypes = {
  /** Passed from Subject Viewer Store */
  enableInteractionLayer: PropTypes.bool,
  /** @zooniverse/async-states */
  loadingState: PropTypes.string,
  /** Passed from SubjectViewer and called if `useSubjectImage()` hook fails. */
  onError: PropTypes.func,
  /** Passed from SubjectViewer and dimensions are added to classification metadata. Called after svg layers successfully load with `defaultFrameSrc`. */
  onReady: PropTypes.func,
  /** Required. Passed from mobx store via SubjectViewer. */
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  }).isRequired
}
