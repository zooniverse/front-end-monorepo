import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import { useEffect } from 'react'

import { useSubjectImage } from '@hooks'

import PlaceholderSVG from './components/PlaceholderSVG'
import SingleImageViewer from './SingleImageViewer'

const DEFAULT_HANDLER = () => true
const DEFAULT_TITLE = {
  id: 'unknown',
  text: 'unknown'
}

function SingleImageViewerContainer({
  enableInteractionLayer = true,
  enableRotation = DEFAULT_HANDLER,
  frame = 0,
  invert = false,
  limitSubjectHeight = false,
  move = false,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  rotation = 0,
  setOnZoom = DEFAULT_HANDLER,
  setOnPan = DEFAULT_HANDLER,
  subject,
  title = DEFAULT_TITLE,
  zoomControlFn = null,
  zooming = true
}) {
  // TODO: replace this with a better function to parse the image location from a subject.
  const imageLocation = subject ? subject.locations[frame] : null
  const { img, error, loading, subjectImage } = useSubjectImage({
    src: imageLocation?.url,
    onError,
    onReady
  })
  const {
    naturalHeight = 600,
    naturalWidth = 800
  } = img

  useEffect(function onMount() {
    enableRotation()
  }, [])

  if (loading) {
    return (
      <PlaceholderSVG
        maxHeight={limitSubjectHeight ? `min(${naturalHeight}px, 90vh)` : null}
        maxWidth={limitSubjectHeight ? `${naturalWidth}px` : '100%'}
        viewBox={`0 0 ${naturalWidth} ${naturalHeight}`}
      />
    )
  } 

  if (error) {
    return <div>Something went wrong.</div>
  }

  if (!error && !loading && img?.src && subjectImage) {
    const subjectId = subject?.id || 'unknown'

    return (
      <SingleImageViewer
        enableInteractionLayer={enableInteractionLayer}
        frame={frame}
        imgRef={subjectImage}
        invert={invert}
        limitSubjectHeight={limitSubjectHeight}
        move={move}
        naturalHeight={naturalHeight}
        naturalWidth={naturalWidth}
        rotation={rotation}
        setOnZoom={setOnZoom}
        setOnPan={setOnPan}
        src={img.src}
        subject={subject}
        subjectId={subjectId}
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
  enableRotation: func,
  frame: number,
  invert: bool,
  limitSubjectHeight: bool,
  move: bool,
  onError: func,
  onReady: func,
  rotation: number,
  setOnZoom: func,
  setOnPan: func,
  subject: shape({
    locations: arrayOf(shape({
      url: string
    }))
  }),
  title: shape({
    id: string,
    text: string
  }),
  zoomControlFn: func,
  zooming: bool
}

export default SingleImageViewerContainer
