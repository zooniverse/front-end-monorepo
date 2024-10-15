import { ParentSize } from '@visx/responsive'
import { Box } from 'grommet'
import { useEffect } from 'react'

import ZoomControlButton from '../ZoomControlButton'

import SVGImage from '../SVGComponents/SVGImage'
import VisXZoom from '../SVGComponents/VisXZoom'

const DEFAULT_HANDLER = () => true

function NewSingleImageViewer({
  enableInteractionLayer = true,
  enableRotation = DEFAULT_HANDLER,
  imgRef,
  invert = false,
  limitSubjectHeight = false,
  move = false,
  naturalHeight,
  naturalWidth,
  rotation = 0,
  setOnZoom = DEFAULT_HANDLER,
  setOnPan = DEFAULT_HANDLER,
  src,
  subjectId,
  title = {},
  zoomControlFn,
  zooming = true
}) {
  useEffect(function onMount() {
    enableRotation()
  }, [])

  const rotationTransform = `rotate(${rotation} ${naturalWidth / 2} ${naturalHeight / 2})`

  const SVGImageComponent = ({ transform: panZoomTransform }) => (
    <svg>
      <g transform={panZoomTransform}>
        <SVGImage
          ref={imgRef}
          invert={invert}
          move={move}
          naturalHeight={naturalHeight}
          naturalWidth={naturalWidth}
          src={src}
          subjectID={subjectId}
        />
      </g>
    </svg>
  )

  return (
    <ParentSize>
      {(parent) => (
        <Box
          align='flex-end'
          animation='fadeIn'
          height={parent.height}
          overflow='hidden'
          width={parent.width}
        >
          {zoomControlFn &&
            <ZoomControlButton
              onClick={zoomControlFn}
              position='absolute'
              zooming={zooming}
            />}
          <svg viewBox={`0 0 ${naturalWidth} ${naturalHeight}`}>
            <g transform={rotationTransform}>
              <VisXZoom
                height={naturalHeight}
                setOnPan={setOnPan}
                setOnZoom={setOnZoom}
                width={naturalWidth}
                zoomingComponent={SVGImageComponent}
                zooming={zooming}
              />
            </g>
          </svg>
        </Box>
      )}
    </ParentSize>
  )
}

export default NewSingleImageViewer
