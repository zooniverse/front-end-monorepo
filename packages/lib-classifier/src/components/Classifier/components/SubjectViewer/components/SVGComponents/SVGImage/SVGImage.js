import { PropTypes } from 'prop-types'
import styled from 'styled-components'

import { draggable } from '@plugins/drawingTools/components'

export const DraggableImage = styled(draggable('image'))`
  cursor: move;
`

const INVERT =
  `<svg style="position: fixed; right: 100%; top: 100%; visibility: hidden;">
    <defs>
      <filter id="svg-invert-filter" color-interpolation-filters="sRGB">
        <feComponentTransfer>
          <feFuncR type="table" tableValues="1 0"/>
          <feFuncG type="table" tableValues="1 0"/>
          <feFuncB type="table" tableValues="1 0"/>
        </feComponentTransfer>
      </filter>
    </defs>
  </svg>`

export default function SVGImage ({
  invert = false,
  move = false,
  naturalHeight,
  naturalWidth,
  onDrag = () => true,
  src,
  subjectID
}) {
  if (!document.getElementById('svg-invert-filter')) {
    document.body.insertAdjacentHTML('afterbegin', INVERT)
  }

  if (move) {
    return (
      <DraggableImage
        aria-label={`Subject ${subjectID}`}
        dragMove={move ? onDrag : () => null}
        height={naturalHeight}
        role='img'
        filter={invert ? 'url("#svg-invert-filter")' : undefined}
        width={naturalWidth}
        href={src}
      />
    )
  } else {
    return (
      <image
        aria-label={`Subject ${subjectID}`}
        height={naturalHeight}
        role='img'
        filter={invert ? 'url("#svg-invert-filter")' : undefined}
        width={naturalWidth}
        href={src}
      />
    )
  }
}

SVGImage.propTypes = {
  invert: PropTypes.bool,
  move: PropTypes.bool,
  naturalHeight: PropTypes.number.isRequired,
  naturalWidth: PropTypes.number.isRequired,
  onDrag: PropTypes.func,
  src: PropTypes.string.isRequired,
  subjectID: PropTypes.string.isRequired
}
