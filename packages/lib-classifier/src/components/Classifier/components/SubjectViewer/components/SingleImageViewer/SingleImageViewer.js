import { ParentSize } from '@visx/responsive'
import { Box } from 'grommet'
import { bool, func, number, shape, string } from 'prop-types'
import { useEffect, useRef } from 'react'

import SVGContext from '@plugins/drawingTools/shared/SVGContext'

import InteractionLayer from '../InteractionLayer'
import ZoomControlButton from '../ZoomControlButton'

import SVGImage from '../SVGComponents/SVGImage'
import VisXZoom from '../SVGComponents/VisXZoom'

const DEFAULT_HANDLER = () => true

function SingleImageViewer({
  enableInteractionLayer = true,
  enableRotation = DEFAULT_HANDLER,
  frame = 0,
  imgRef,
  invert = false,
  limitSubjectHeight = false,
  move = false,
  naturalHeight,
  naturalWidth,
  panning = true,
  rotation = 0,
  scale = 1,
  setOnZoom = DEFAULT_HANDLER,
  setOnPan = DEFAULT_HANDLER,
  src,
  subject,
  subjectId,
  title = {},
  zoomControlFn,
  zooming = true
}) {
  const canvasLayer = useRef()
  const canvas = canvasLayer.current

  useEffect(function onMount() {
    enableRotation()
  }, [])

  const rotationTransform = `rotate(${rotation} ${naturalWidth / 2} ${naturalHeight / 2})`

  const viewBox = `0 0 ${naturalWidth} ${naturalHeight}`

  const SVGImageComponent = ({
    children,
    transform: panZoomTransform
  }) => (
    <svg
      ref={canvasLayer}
      viewBox={viewBox}
    >
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
        {children}
        {enableInteractionLayer && (
          <InteractionLayer
            frame={frame}
            height={naturalHeight}
            scale={scale}
            subject={subject}
            width={naturalWidth}
          />
        )}
      </g>
    </svg>
  )

  return (
    <ParentSize>
      {(parent) => (
        <SVGContext.Provider
          value={{
            canvas,
            viewBox,
            rotate: rotation,
            width: parent.width,
            height: parent.height
          }}
        >
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
            <svg viewBox={viewBox}>
              <g transform={rotationTransform}>
                <VisXZoom
                  height={naturalHeight}
                  panning={panning}
                  setOnPan={setOnPan}
                  setOnZoom={setOnZoom}
                  width={naturalWidth}
                  zoomingComponent={SVGImageComponent}
                  zooming={zooming}
                />
              </g>
            </svg>
          </Box>
        </SVGContext.Provider>
      )}
    </ParentSize>
  )
}

SingleImageViewer.propTypes = {
  enableInteractionLayer: bool,
  enableRotation: func,
  frame: number,
  imgRef: shape({
    current: shape({
      naturalHeight: number,
      naturalWidth: number,
      src: string
    })
  }),
  invert: bool,
  limitSubjectHeight: bool,
  move: bool,
  naturalHeight: number,
  naturalWidth: number,
  panning: bool,
  rotation: number,
  scale: number,
  setOnZoom: func,
  setOnPan: func,
  src: string,
  subjectId: string,
  title: shape({
    id: string,
    text: string
  }),
  zoomControlFn: func,
  zooming: bool
}

export default SingleImageViewer
