import { Box } from 'grommet'
import { useState } from 'react'

import FlipbookControls from './FlipbookControls'
import {
  CHIMP_AND_SEE_VIDEO_IMAGES_SUBJECT,
  NFN_IMAGE_TEXT_SUBJECT,
  SMITHSONIAN_WILDLIFE_MULTI_IMAGE_SUBJECT,
  SQUIRREL_MAPPER_MULTI_IMAGE_SUBJECT
} from '../../../../stories/SubjectCardStoryData'

const IMAGE_SOURCES = SMITHSONIAN_WILDLIFE_MULTI_IMAGE_SUBJECT.locations.map(location => ({
  mimeType: Object.keys(location)[0],
  url: Object.values(location)[0]
}))
const EXTERNAL_IMAGE_SOURCES = SQUIRREL_MAPPER_MULTI_IMAGE_SUBJECT.locations.map(location => ({
  mimeType: Object.keys(location)[0],
  url: Object.values(location)[0]
}))
const VIDEO_SOURCES = CHIMP_AND_SEE_VIDEO_IMAGES_SUBJECT.locations.map(location => ({
  mimeType: Object.keys(location)[0],
  url: Object.values(location)[0]
}))
const IMAGE_TEXT_SOURCES = NFN_IMAGE_TEXT_SUBJECT.locations.map(location => ({
  mimeType: Object.keys(location)[0],
  url: Object.values(location)[0]
}))

function FlipbookControlsPreview({ sources = IMAGE_SOURCES }) {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [playing, setPlaying] = useState(false)

  return (
    <Box width='300px'>
      <FlipbookControls
        currentFrame={currentFrame}
        onFrameChange={setCurrentFrame}
        onPlayPause={() => setPlaying(previousPlaying => !previousPlaying)}
        playing={playing}
        sources={sources}
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
  render: () => <FlipbookControlsPreview sources={EXTERNAL_IMAGE_SOURCES} />
}

export const VideoImages = {
  render: () => <FlipbookControlsPreview sources={VIDEO_SOURCES} />
}

export const ImageText = {
  render: () => <FlipbookControlsPreview sources={IMAGE_TEXT_SOURCES} />
}
