import { Box } from 'grommet'
import { ParentSize } from '@visx/responsive'

import SVGImage from '../SVGComponents/SVGImage'
import VisXZoom from '../SVGComponents/VisXZoom'

import ZoomControlButton from '../ZoomControlButton'

function NewSingleImageViewer({
  enableInteractionLayer,
  enableRotation,
  imgRef,
  invert,
  limitSubjectHeight,
  move,
  naturalHeight,
  naturalWidth,
  rotation,
  setOnZoom,
  setOnPan,
  src,
  subjectId,
  title,
  zoomControlFn,
  zooming
}) {
  // TODO: so much

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
            <ZoomControlButton onClick={zoomControlFn} position='absolute' zooming={zooming} />}
            <img
              alt={title.text}
              src={src}
            />
        </Box>
      )}
    </ParentSize>
  )
}

export default NewSingleImageViewer

{/* <VisXZoom
  height={naturalHeight}
  setOnPan={setOnPan}
  setOnZoom={setOnZoom}
  width={naturalWidth}
  zoomingComponent={???}
/> */}
