import { Box } from 'grommet'
import PropTypes from 'prop-types'

/**
The Single Text Viewer is a variant of the Subject Viewer that's used to display text media.
The `content` is defined by a subject's text mime type location.
The `height` is defined in the ImageAndTextViewerContainer as the clientHeight per the Subject Viewer store dimensions. The Subject Viewer store dimensions are defined by the dimensions of the subject image location and image viewer.
```
<SingleTextViewer
  content={content}
  height={height}
/>
```
*/

function SingleTextViewer ({
  content = '',
  height = '',
  subjectId = ''
}) {
  return (
    <Box
      a11yTitle={`Subject ${subjectId} text`}
      flex='grow'
      height={{ min: height }}
      pad='xsmall'
      role='document'
      tabIndex='0'
    >
      <pre
        style={{ whiteSpace: 'pre-wrap' }}
      >
        {content}
      </pre>
    </Box>
  )
}

SingleTextViewer.propTypes = {
  /** String defined by a subject's text mime type location */
  content: PropTypes.string,
  /** Minimum height of the text viewer in CSS units eg. '400px', '0.25vh', '20rem' etc. */
  height: PropTypes.string,
  /** Subject ID */
  subjectId: PropTypes.string
}

export default SingleTextViewer
