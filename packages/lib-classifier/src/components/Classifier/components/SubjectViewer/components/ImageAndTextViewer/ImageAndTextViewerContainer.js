import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import asyncStates from '@zooniverse/async-states'

import withKeyZoom from '@components/Classifier/components/withKeyZoom'
import { draggable } from '@plugins/drawingTools/components'

import useSubjectImage, { placeholder } from '../SingleImageViewer/hooks/useSubjectImage'
import locationValidator from '../../helpers/locationValidator'
import SingleImageViewer from '../SingleImageViewer/SingleImageViewer'
import SVGPanZoom from '../SVGComponents/SVGPanZoom'
import SingleTextViewer from '../SingleTextViewer'
import StepNavigation from '@components/Classifier/components/SlideTutorial/components/StepNavigation'

const DraggableImage = styled(draggable('image'))`
  cursor: move;
`

function ImageAndTextViewerContainer ({
  enableRotation = () => null,
  frame = 0,
  ImageObject = window.Image,
  loadingState = asyncStates.initialized,
  move = false,
  onError = () => true,
  onKeyDown = () => true,
  onReady = () => true,
  rotation = 0,
  setFrame = () => true,
  setOnPan = () => true,
  setOnZoom = () => true,
  subject,
  title = {},
  zoomControlFn,
  zooming = true
}) {
  function handleFrameChange (newFrame) {
    setFrame(newFrame)
  }

  if (loadingState === asyncStates.error) {
    return (
      <div>Something went wrong.</div>
    )
  }

  const [mimeType] = Object.keys(subject.locations[frame])
  const imageTypes = [
    'image/png',
    'image/jpeg',
    'image/gif'
  ]

  if (loadingState !== asyncStates.initialized) {
    if (imageTypes.includes(mimeType)) {
      const subjectImage = useRef()
      const [dragMove, setDragMove] = useState()

      const imageUrl = subject ? Object.values(subject.locations[frame])[0] : null
      const { img, error } = useSubjectImage(ImageObject, imageUrl)
      // default to a placeholder while image is loading.
      const { naturalHeight, naturalWidth, src } = img

      useEffect(function onImageLoad () {
        if (src !== placeholder.src) {
          const svgImage = subjectImage.current
          const { width: clientWidth, height: clientHeight } = svgImage
            ? svgImage.getBoundingClientRect()
            : {}
          const target = { clientHeight, clientWidth, naturalHeight, naturalWidth }
          onReady({ target })
        }
      }, [src])

      useEffect(function onMount () {
        enableRotation()
      }, [])

      if (error) {
        console.error(error)
        onError(error)
      }

      function setOnDrag (callback) {
        setDragMove(() => callback)
      }

      function onDrag (event, difference) {
        dragMove?.(event, difference)
      }

      const SubjectImage = move ? DraggableImage : 'image'
      const subjectImageProps = {
        height: naturalHeight,
        width: naturalWidth,
        xlinkHref: src,
        ...(move && { dragMove: onDrag })
      }

      return (
        <Box
          fill='horizontal'
        >
          <SVGPanZoom
            img={subjectImage.current}
            maxZoom={5}
            minZoom={0.1}
            naturalHeight={naturalHeight}
            naturalWidth={naturalWidth}
            setOnDrag={setOnDrag}
            setOnPan={setOnPan}
            setOnZoom={setOnZoom}
            zooming={zooming}
            src={src}
          >
            <SingleImageViewer
              enableInteractionLayer={false}
              height={naturalHeight}
              onKeyDown={onKeyDown}
              rotate={rotation}
              title={title}
              width={naturalWidth}
              zoomControlFn={zoomControlFn}
              zooming={zooming}
            >
              <g ref={subjectImage}>
                <SubjectImage
                  {...subjectImageProps}
                />
              </g>
            </SingleImageViewer>
          </SVGPanZoom>
          <StepNavigation
            onChange={handleFrameChange}
            stepIndex={frame}
            steps={[0, 1]}
          />
        </Box>
      )
    }
    if (mimeType === 'text/plain') {
      return (
        <Box
          fill='horizontal'
        >
          <SingleTextViewer />
          <StepNavigation
            onChange={handleFrameChange}
            stepIndex={frame}
            steps={[0, 1]}
          />
        </Box>
      )
    }
  }
  return null
}

ImageAndTextViewerContainer.propTypes = {
  enableRotation: PropTypes.func,
  frame: PropTypes.number,
  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onReady: PropTypes.func,
  setFrame: PropTypes.func,
  setOnPan: PropTypes.func,
  setOnZoom: PropTypes.func,
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  }),
  title: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string
  }),
  zoomControlFn: PropTypes.func,
  zooming: PropTypes.bool
}

export default withKeyZoom(ImageAndTextViewerContainer)
export { DraggableImage, ImageAndTextViewerContainer }
