import { CollectIconButton, FavoritesIconButton, InvertIconButton, Media } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { Bookmark, ShareOption } from 'grommet-icons'
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
      type: type,
      mimeType: mimeType,
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
  const subjectURLs = subject?.locations?.map(location => Object.values(location)[0])
  const subjectURL = subjectURLs[frame]
  const locations = processSubjectLocations(subject.locations)

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
      height={{ max: '90vh'}}
      style={{
        gridArea: 'viewer'
      }}
    >
      <StyledMedia
        alt={t('Home.ZooniverseTalk.RecentSubjects.subjectLabel', { id: subjectId })}
        fit='contain'
        flex='shrink'
        $invert={invert}
        subject={subject}
        src={subjectURL}
      />
      <Box>
        {locations?.length > 1 ? (
          <FlipbookControls
            currentFrame={frame}
            flipbookSpeed={flipbookSpeed}
            locations={locations}
            onFrameChange={setFrame}
            onPlayPause={onPlayPause}
            playing={playing}
            playIterations={1}
            setFlipbookSpeed={setFlipbookSpeed}
          />
        ) : null}
        {/* <MetaTools /> */}
        <Box
          direction='row'
          gap='small'
          justify='center'
          margin='small'
        >
          <FavoritesIconButton
            login={login}
            projectId={projectId}
            projectSlug={projectSlug}
            subjectId={subjectId}
          />
          <CollectIconButton
            projectId={projectId}
            subjectId={subjectId}
            userId={userId}
          />
          <ShareOption />
          <InvertIconButton
            checked={invert}
            onClick={onInvert}
          />
        </Box>
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
