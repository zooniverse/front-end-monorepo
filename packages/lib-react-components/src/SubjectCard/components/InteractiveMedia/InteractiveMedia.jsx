import { bool, node, number, arrayOf, string } from 'prop-types'
import { useEffect, useMemo, useState } from 'react'

import SimpleMedia from '../SimpleMedia'
import FlipbookControls from './components/FlipbookControls'

const FLIPBOOK_INTERVAL = 500

function InteractiveMedia({
  mediaSources = [],
  mediaSrc,
  placeholder,
  previewHeight,
  showBackground,
  subjectIdTitle,
  width
}) {
  const hasFlipbook = mediaSources.length > 1
  const [currentFrame, setCurrentFrame] = useState(0)
  const [playing, setPlaying] = useState(false)

  const currentMediaSrc = useMemo(() => {
    if (hasFlipbook) {
      return mediaSources[currentFrame]
    }

    return mediaSrc
  }, [currentFrame, hasFlipbook, mediaSources, mediaSrc])

  useEffect(() => {
    setCurrentFrame(0)
    setPlaying(false)
  }, [mediaSources])

  useEffect(() => {
    if (!playing || !hasFlipbook) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      setCurrentFrame(previousFrame => {
        if (previousFrame < mediaSources.length - 1) {
          return previousFrame + 1
        }

        return 0
      })
    }, FLIPBOOK_INTERVAL)

    return () => {
      window.clearTimeout(timer)
    }
  }, [currentFrame, hasFlipbook, mediaSources.length, playing])

  if (!currentMediaSrc) return null

  function handleFrameChange(frameIndex) {
    setPlaying(false)
    setCurrentFrame(frameIndex)
  }

  function handlePlayPause() {
    setPlaying(previousPlaying => !previousPlaying)
  }

  return (
    <>
      <SimpleMedia
        mediaSrc={currentMediaSrc}
        placeholder={placeholder}
        previewHeight={previewHeight}
        showBackground={showBackground}
        showTitle={false}
        subjectIdTitle={subjectIdTitle}
        width={width}
      />

      {hasFlipbook ? (
        <FlipbookControls
          currentFrame={currentFrame}
          imageSources={mediaSources}
          onFrameChange={handleFrameChange}
          onPlayPause={handlePlayPause}
          playing={playing}
        />
      ) : null}
    </>
  )
}

InteractiveMedia.propTypes = {
  mediaSources: arrayOf(string),
  mediaSrc: string,
  placeholder: node,
  previewHeight: number.isRequired,
  showBackground: bool,
  subjectIdTitle: string.isRequired,
  width: number.isRequired
}

export default InteractiveMedia
