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
  return rawLocations.map(location => {
    const [mimeType, url] = Object.entries(location)[0];
    const [type] = mimeType.split('/');
    return {
      mimeType: mimeType,
      type: type,
      url: url
    }
  })
}

function SubjectTalkViewer({
    login,
    projectId,
    projectSlug,
    subject,
    userId
  }) {
  const [frame, setFrame] = useState(0)
  const [flipbookSpeed, setFlipbookSpeed] = useState(1)
  const [invert, setInvert] = useState(false)
  const [playing, setPlaying] = useState(false)

  const { t } = useTranslation('screens')
  
  const subjectId = subject?.id
  const processedLocations = processSubjectLocations(subject?.locations)

  function onInvert() {
    setInvert(!invert)
  }

  function onPlayPause() {
    setPlaying(!playing)
  }

  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'white'
      }}
    >
      <StyledMedia
        alt={t('Home.ZooniverseTalk.RecentSubjects.subjectLabel', { id: subjectId })}
        fit='contain'
        flex='shrink'
        $invert={invert}
        subject={subject}
        src={processedLocations?.[frame]?.url}
      />
      <Box flex={false}>
        {subject?.locations?.length > 1 ? (
          <FlipbookControls
            currentFrame={frame}
            flipbookSpeed={flipbookSpeed}
            locations={processedLocations}
            onFrameChange={setFrame}
            onPlayPause={onPlayPause}
            playing={playing}
            playIterations={1}
            setFlipbookSpeed={setFlipbookSpeed}
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
