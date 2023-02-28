import { Box } from 'grommet'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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

const StyledPre = styled.pre`
  white-space: pre-wrap;
  font-family: 'Anonymous Pro', monospace;
  @font-face {
    font-family: 'Anonymous Pro';
    font-style: normal;
    font-weight: 400;
    src:
      local('Anonymous Pro'),
      local('Anonymous Pro-Regular'),
      url(https://fonts.gstatic.com/s/anonymouspro/v21/rP2Bp2a15UIB7Un-bOeISG3pHls29QP-4Ks.woff2) 
      format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
`

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
      <StyledPre>
        {content}
      </StyledPre>
    </Box>
  )
}

SingleTextViewer.propTypes = {
  /** String defined by a subject's text mime type location */
  content: PropTypes.string,
  /** Minimum height of the text viewer in CSS units eg. '400px', '0.25vh', '20rem' etc. */
  height: PropTypes.string
}

export default SingleTextViewer
