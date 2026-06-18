import {
  Media,
  MetaTools
} from '@zooniverse/react-components'
import { Box } from 'grommet'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { shape, string } from 'prop-types'
import { useState } from 'react'
import styled from 'styled-components'

// Dynamically import FlipbookControls with SSR disabled
const FlipbookControls = dynamic(() => import('@zooniverse/classifier').then(mod => mod.FlipbookControls), {
  ssr: false
})

const StyledMedia = styled(Media)`
  filter: ${props => props.$invert ? 'invert(1)' : 'none'};
`

function processSubjectLocations(rawLocations) {
  const locations = []
  let firstImageIndex = -1
  let audioUrl = null

  rawLocations.forEach((location, index) => {
    const [mimeType, url] = Object.entries(location)[0]
    const [type] = mimeType.split('/')
    locations.push({ mimeType, type, url })
    if (type === 'image' && firstImageIndex === -1) firstImageIndex = index
    if (type === 'audio') audioUrl = url
  })

  return { locations, firstImageIndex, audioUrl }
}

function SubjectTalkViewer({
    login,
    projectId,
    projectSlug,
    subject,
    userId
  }) {
  const { locations, firstImageIndex, audioUrl } = processSubjectLocations(subject?.locations)
  const defaultFrame = firstImageIndex >= 0 ? firstImageIndex : 0

  const [frame, setFrame] = useState(defaultFrame)
  const [invert, setInvert] = useState(false)

  const { t } = useTranslation('screens')

  const subjectId = subject?.id

  function onInvert() {
    setInvert(!invert)
  }

  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      border={{ color: 'light-5', side: 'all', size: '0.5px' }}
      height={{ min: '300px', max: '90vh' }}
      round={{ size: '8px', corner: 'bottom' }}
    >
      <StyledMedia
        alt={t('Home.ZooniverseTalk.RecentSubjects.subjectLabel', { id: subjectId })}
        background={{
          dark: 'dark-3',
          light: 'neutral-6'
        }}
        fit='contain'
        flex='shrink'
        $invert={invert}
        placeholder={
          <Box
            align='center'
            justify='center'
            height='40vh'
            width='600px'
            background={{
              image: `url(https://static.zooniverse.org/fem-assets/subject-placeholder.jpg)`,
              size: 'cover',
              position: 'center'
            }}
          />
        }
        subject={subject}
        src={locations?.[frame]?.url}
      />
      <Box flex={false}>
        {audioUrl ? (
          <Box pad='xsmall'>
            <audio controls preload='metadata' src={audioUrl} style={{ width: '100%' }}>
              <track kind='captions' />
            </audio>
          </Box>
        ) : locations.length > 1 ? (
          <FlipbookControlsWrapper
            locations={locations}
            frame={frame}
            onFrameChange={setFrame}
          />
        ) : null}
        <MetaTools
          invert={invert}
          location={subject?.locations?.[frame]}
          login={login}
          onInvert={onInvert}
          projectId={projectId}
          projectSlug={projectSlug}
          subjectId={subjectId}
          userId={userId}
        />
      </Box>
    </Box>
  )
}

/** Isolates flipbook playback state from SubjectTalkViewer */
function FlipbookControlsWrapper({ locations, frame, onFrameChange }) {
  const [flipbookSpeed, setFlipbookSpeed] = useState(1)
  const [playing, setPlaying] = useState(false)

  return (
    <FlipbookControls
      currentFrame={frame}
      flipbookSpeed={flipbookSpeed}
      locations={locations}
      onFrameChange={onFrameChange}
      onPlayPause={() => setPlaying(p => !p)}
      playing={playing}
      playIterations={1}
      setFlipbookSpeed={setFlipbookSpeed}
    />
  )
}

SubjectTalkViewer.propTypes = {
  login: string,
  projectId: string,
  projectSlug: string,
  subject: shape({
    id: string
  }),
  userId: string
}

export default SubjectTalkViewer
