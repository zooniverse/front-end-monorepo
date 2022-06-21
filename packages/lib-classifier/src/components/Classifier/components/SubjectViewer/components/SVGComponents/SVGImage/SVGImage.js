import { PropTypes } from 'prop-types'
import React, { useEffect } from 'react'
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
  invert,
  move,
  naturalHeight,
  naturalWidth,
  onDrag,
  src,
  subjectID
}) {
 if (!document.getElementById('svg-invert-filter')) {
   document.body.insertAdjacentHTML('afterbegin', INVERT)
}

  const SubjectImage = move ? DraggableImage : 'image'

  return (
    <SubjectImage
      aria-label={`Subject ${subjectID}`}
      dragMove={move ? onDrag : () => null}
      height={naturalHeight}
      role='img'
      style={invert ? { filter: 'url("#svg-invert-filter")' } : {}}
      width={naturalWidth}
      xlinkHref={src}
    />
  )
}
