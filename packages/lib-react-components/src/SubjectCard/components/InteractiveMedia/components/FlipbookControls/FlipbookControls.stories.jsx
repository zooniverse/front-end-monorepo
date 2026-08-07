import { Box } from 'grommet'
import { useState } from 'react'

import FlipbookControls from './FlipbookControls'
import {
  SMITHSONIAN_WILDLIFE_MULTI_IMAGE_SUBJECT,
  SQUIRREL_MAPPER_MULTI_IMAGE_SUBJECT
} from '../../../../stories/SubjectCardStoryData'

const IMAGE_SOURCES = SMITHSONIAN_WILDLIFE_MULTI_IMAGE_SUBJECT.locations.map(location => Object.values(location)[0])
const EXTERNAL_IMAGE_SOURCES = SQUIRREL_MAPPER_MULTI_IMAGE_SUBJECT.locations.map(location => Object.values(location)[0])

function FlipbookControlsPreview({ imageSources = IMAGE_SOURCES }) {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [playing, setPlaying] = useState(false)

  return (
    <Box width='300px'>
      <FlipbookControls
        currentFrame={currentFrame}
        imageSources={imageSources}
        onFrameChange={setCurrentFrame}
        onPlayPause={() => setPlaying(previousPlaying => !previousPlaying)}
        playing={playing}
      />
    </Box>
  )
}

const meta = {
  title: 'Components / SubjectCard / Interactive / MultiMedia / Flipbook Controls',
  component: FlipbookControls
}

export default meta

export const Default = {
  render: () => <FlipbookControlsPreview />
}

export const ExternalImages = {
  render: () => <FlipbookControlsPreview imageSources={EXTERNAL_IMAGE_SOURCES} />
}
