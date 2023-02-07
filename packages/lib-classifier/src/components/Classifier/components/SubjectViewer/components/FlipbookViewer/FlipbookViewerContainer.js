import { useState } from 'react'
import asyncStates from '@zooniverse/async-states'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import withKeyZoom from '@components/Classifier/components/withKeyZoom'
import { useStores } from '@hooks'
import locationValidator from '../../helpers/locationValidator'
import FlipbookViewer from './FlipbookViewer'
import FlipbookSeparateFrame from './components/FlipbookSeparateFrame'

function storeMapper(store) {
  const {
    enableRotation,
    frame: defaultFrame,
    invert,
    move,
    rotation,
    setOnPan,
    setOnZoom
  } = store.subjectViewer
  const { playIterations } = store.workflows.active.configuration

  return {
    defaultFrame,
    enableRotation,
    invert,
    move,
    playIterations,
    rotation,
    setOnPan,
    setOnZoom
  }
}

function FlipbookViewerContainer({
  loadingState = asyncStates.initialized,
  onError = () => true,
  onKeyDown = () => true,
  onReady = () => true,
  subject
}) {
  const {
    defaultFrame,
    enableRotation,
    invert,
    move,
    playIterations,
    rotation,
    setOnPan,
    setOnZoom
  } = useStores(storeMapper)
  const [separateFrameView, setSeparateFrameView] = useState(false)

  const toggleSeparateFramesView = () => {
    setSeparateFrameView(!separateFrameView)
  }

  if (loadingState === asyncStates.error || !subject?.locations) {
    return <div>Something went wrong.</div>
  }

  return separateFrameView ? (
    <>
      {subject.locations?.map(location => (
        <FlipbookSeparateFrame
          enableRotation={enableRotation}
          frameUrl={Object.values(location)[0]}
          key={Object.values(location)[0]}
          invert={invert}
          move={move}
          onError={onError}
          onKeyDown={onKeyDown}
          onReady={onReady}
          rotation={rotation}
          setOnPan={setOnPan}
          setOnZoom={setOnZoom}
          subject={subject}
          toggleSeparateFramesView={toggleSeparateFramesView}
        />
      ))}
      <div>Button here</div>
    </>
  ) : (
    <FlipbookViewer
      defaultFrame={defaultFrame}
      enableRotation={enableRotation}
      invert={invert}
      move={move}
      onError={onError}
      onKeyDown={onKeyDown}
      onReady={onReady}
      playIterations={playIterations}
      rotation={rotation}
      setOnPan={setOnPan}
      setOnZoom={setOnZoom}
      subject={subject}
      toggleSeparateFramesView={toggleSeparateFramesView}
    />
  )
}

FlipbookViewerContainer.propTypes = {
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

export default withKeyZoom(observer(FlipbookViewerContainer))
