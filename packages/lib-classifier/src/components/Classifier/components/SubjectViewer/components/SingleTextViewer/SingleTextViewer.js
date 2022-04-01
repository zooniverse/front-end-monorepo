import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

/**
The Single Text Viewer is a variant of the Subject Viewer that's used to display text media.
The `content` is defined by a subject's text mime type location.
```
<SingleTextViewer
  content={content}
/>
```
*/

function SingleTextViewer ({
  content = ''
}) {
  return (
    <Box
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
  content: PropTypes.string
}

export default SingleTextViewer
