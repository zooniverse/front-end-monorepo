import { Box } from 'grommet'
import { useState } from 'react'

import FlipbookControls from './FlipbookControls'
import { SMITHSONIAN_WILDLIFE_MULTI_IMAGE_SUBJECT } from '../../../../stories/SubjectCardStoryData'

const IMAGE_SOURCES = SMITHSONIAN_WILDLIFE_MULTI_IMAGE_SUBJECT.locations.map(location => Object.values(location)[0])

function FlipbookControlsPreview() {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [playing, setPlaying] = useState(false)

  return (
    <Box width='300px'>
      <FlipbookControls
        currentFrame={currentFrame}
        imageSources={IMAGE_SOURCES}
        onFrameChange={setCurrentFrame}
        onPlayPause={() => setPlaying(previousPlaying => !previousPlaying)}
        playing={playing}
      />
    </Box>
  )
}

const meta = {
  title: 'Components / SubjectCard / Interactive / Flipbook Controls',
  component: FlipbookControls
}

export default meta

export const Default = {
  render: () => <FlipbookControlsPreview />
}
