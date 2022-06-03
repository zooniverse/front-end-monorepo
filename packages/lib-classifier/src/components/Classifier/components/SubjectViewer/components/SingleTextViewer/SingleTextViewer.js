import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

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
  height = ''
}) {
  return (
    <Box
      flex='grow'
      height={{ min: height }}
      pad='xsmall'
    >
      <pre style={{ whiteSpace: 'pre-wrap' }}>
        {content}
      </pre>
    </Box>
  )
}

SingleTextViewer.propTypes = {
  /** String defined by a subject's text mime type location */
  content: PropTypes.string,
  /** Minimum height of the text viewer */
  height: PropTypes.string
}

export default SingleTextViewer
