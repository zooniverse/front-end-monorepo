import asyncStates from '@zooniverse/async-states'
import { observer } from 'mobx-react'
import { bool, func, shape, string } from 'prop-types'

import { useKeyZoom, useStores, useSubjectImage } from '@hooks'

import PlaceholderSVG from './components/PlaceholderSVG'
import SingleImageViewer from './SingleImageViewer'

function storeMapper(classifierStore) {
  const {
    subjects: {
      active: subject
    },
    subjectViewer: {
      enableRotation,
      frame,
      invert,
      move,
      rotation,
      setOnZoom,
      setOnPan
    },
    workflows: {
      active: {
        configuration: {
          limit_subject_height: limitSubjectHeight
        }
      }
    }
  } = classifierStore

  return {
    enableRotation,
    frame,
    invert,
    limitSubjectHeight,
    move,
    rotation,
    setOnZoom,
    setOnPan,
    subject
  }
}

const DEFAULT_HANDLER = () => true

function SingleImageViewerContainer({
  enableInteractionLayer = true,
  imageLocation = null,
  loadingState = asyncStates.initialized,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  title = undefined,
  zoomControlFn = null,
  zooming = true
}) {
  const {
    enableRotation,
    frame,
    invert,
    limitSubjectHeight,
    move,
    rotation,
    setOnZoom,
    setOnPan,
    subject
  } = useStores(storeMapper)

  const { onKeyZoom } = useKeyZoom()

  // TODO: replace this with a better function to parse the image location from a subject.

  // if imageLocation is provided, use it, otherwise use the subject's location per subjectViewer store frame

  const imageLocationUrl = imageLocation?.url ? imageLocation.url : subject?.locations[frame]?.url

  const { img, error, loading, subjectImage } = useSubjectImage({
    src: imageLocationUrl,
    onError,
    onReady
  })
  const {
    naturalHeight = 600,
    naturalWidth = 800
  } = img

  if (loadingState === asyncStates.loading) {
    return (
      <PlaceholderSVG
        ref={subjectImage}
        maxHeight={limitSubjectHeight ? `min(${naturalHeight}px, 90vh)` : null}
        maxWidth={limitSubjectHeight ? `${naturalWidth}px` : '100%'}
        viewBox={`0 0 ${naturalWidth} ${naturalHeight}`}
      />
    )
  }

  if (loadingState === asyncStates.error) {
    return <div>Something went wrong.</div>
  }

  if (loadingState === asyncStates.success) {
    return (
      <SingleImageViewer
        enableInteractionLayer={enableInteractionLayer}
        enableRotation={enableRotation}
        frame={frame}
        imgRef={subjectImage}
        invert={invert}
        limitSubjectHeight={limitSubjectHeight}
        move={move}
        naturalHeight={naturalHeight}
        naturalWidth={naturalWidth}
        onKeyDown={onKeyZoom}
        rotation={rotation}
        setOnPan={setOnPan}
        setOnZoom={setOnZoom}
        src={img.src}
        subject={subject}
        title={title}
        zoomControlFn={zoomControlFn}
        zooming={zooming}
      />
    )
  }

  return null
}

SingleImageViewerContainer.propTypes = {
  enableInteractionLayer: bool,
  imageLocation: shape({
    url: string
  }),
  loadingState: string,
  onError: func,
  onReady: func,
  title: shape({
    id: string,
    text: string
  }),
  zoomControlFn: func,
  zooming: bool
}

export default observer(SingleImageViewerContainer)
