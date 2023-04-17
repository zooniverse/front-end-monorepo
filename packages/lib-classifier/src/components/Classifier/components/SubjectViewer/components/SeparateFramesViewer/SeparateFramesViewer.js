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

function SeparateFramesViewer({
  loadingState = asyncStates.initialized,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject
}) {
  const { limitSubjectHeight, multiImageLayout } = useStores(storeMapper)

  /** We're simply checking for when this frame container is < 600px
   * to avoid subject images from being very tiny in the frames layout
   */
  const [smallContainerStyle, setSmallContainerStyle] = useState(false)
  const framesContainer = useRef(null)
  const resizeObserver = useRef(null)

  useEffect(() => {
    resizeObserver.current = new window.ResizeObserver((entries) => {
      if (entries[0].contentRect.width < 600) {
        setSmallContainerStyle(true)
      } else {
        setSmallContainerStyle(false)
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
  }, [])

  if (loadingState === asyncStates.error || !subject?.locations) {
    return <div>Something went wrong.</div>
  }

  return (
    <div ref={framesContainer}>
      {(multiImageLayout === 'col' || smallContainerStyle) && (
        <Box gap='small'>
          {subject.locations?.map(location => (
            <SeparateFrame
              frameUrl={Object.values(location)[0]}
              key={Object.values(location)[0]}
              limitSubjectHeight={limitSubjectHeight}
              onError={onError}
              onReady={onReady}
            />
          ))}
        </Box>
      )}
      {multiImageLayout === 'row' && !smallContainerStyle && (
        <Grid
          gap='xsmall'
          columns={[`repeat(${subject.locations?.length}, 1fr)`]}
          rows='auto'
        >
          {subject.locations?.map(location => (
            <SeparateFrame
              frameUrl={Object.values(location)[0]}
              key={Object.values(location)[0]}
              limitSubjectHeight={limitSubjectHeight}
              onError={onError}
              onReady={onReady}
            />
          ))}
        </Grid>
      )}
      {multiImageLayout === 'grid2' && !smallContainerStyle && (
        <Grid
          gap='xsmall'
          columns={['repeat(2, 1fr)']}
          rows='auto'
        >
          {subject.locations?.map(location => (
            <SeparateFrame
              frameUrl={Object.values(location)[0]}
              key={Object.values(location)[0]}
              limitSubjectHeight={limitSubjectHeight}
              onError={onError}
              onReady={onReady}
            />
          ))}
        </Grid>
      )}
      {multiImageLayout === 'grid3' && !smallContainerStyle && (
        <Grid
          gap='xsmall'
          columns={['repeat(3, 1fr)']}
          rows='auto'
        >
          {subject.locations?.map(location => (
            <SeparateFrame
              frameUrl={Object.values(location)[0]}
              key={Object.values(location)[0]}
              limitSubjectHeight={limitSubjectHeight}
              onError={onError}
              onReady={onReady}
            />
          ))}
        </Grid>
      )}
      <Box justify='center' pad='xsmall'>
        <ViewModeButton />
      </Box>
    </div>
  )
}

export default observer(SeparateFramesViewer)

SeparateFramesViewer.propTypes = {
  /** @zooniverse/async-states */
  loadingState: PropTypes.string,
  /** Passed from SubjectViewer and called if `useSubjectImage()` hook fails. */
  onError: PropTypes.func,
  /** withKeyZoom in for using keyboard pan and zoom controls while focused on the subject image */
  onKeyDown: PropTypes.func,
  /** Passed from SubjectViewer and dimensions are added to classification metadata. Called after svg layers successfully load with `defaultFrameSrc`. */
  onReady: PropTypes.func,
  /** Required. Passed from mobx store via SubjectViewer. */
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  }).isRequired
}
