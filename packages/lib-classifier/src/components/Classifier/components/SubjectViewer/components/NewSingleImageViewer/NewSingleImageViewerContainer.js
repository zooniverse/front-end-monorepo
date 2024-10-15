import { useSubjectImage } from '@hooks'

import NewSingleImageViewer from './NewSingleImageViewer'

const DEFAULT_HANDLER = () => true

function NewSingleImageViewerContainer({
  enableInteractionLayer = true,
  frame = 0,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject,
  title = {},
  zoomControlFn,
  zooming = true,
  ...props
}) {
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

  if (loading) {
    return <div>Something went wrong.</div>
  }
  if (error) {
    return <p>{ error.message }</p>
  }

  if (!error && !loading && img?.src && subjectImage) {
    const subjectId = subject?.id || 'unknown'

    return (
      <NewSingleImageViewer
        imgRef={subjectImage}
        naturalHeight={naturalHeight}
        naturalWidth={naturalWidth}
        src={img.src}
        subjectId={subjectId}
        title={title}
        zoomControlFn={zoomControlFn}
        zooming={zooming}
        {...props}
      />
    )
  }

  return null
}

export default NewSingleImageViewerContainer
