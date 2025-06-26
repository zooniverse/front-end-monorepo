import { Media } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { Favorite, Bookmark, ShareOption, SubtractCircle } from 'grommet-icons'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { shape, string } from 'prop-types'
import { useState } from 'react'

// Dynamically import FlipbookControls with SSR disabled
const FlipbookControls = dynamic(() => import('@zooniverse/classifier').then(mod => mod.FlipbookControls), {
  ssr: false
})

function processSubjectLocations(rawLocations) {
  return rawLocations.map(location => {
    const [mimeType, url] = Object.entries(location)[0];
    const [type] = mimeType.split('/');
    return {
      type: type,
      mimeType: mimeType,
      url: url
    };
  });
}

function SubjectTalkViewer({ subject }) {
  const [frame, setFrame] = useState(0)
  const [flipbookSpeed, setFlipbookSpeed] = useState(1)
  const [playing, setPlaying] = useState(false)

  const { t } = useTranslation('screens')
  
  const subjectID = subject.id
  const subjectURLs = subject.locations.map(location => Object.values(location)[0])
  const subjectURL = subjectURLs[frame]
  const locations = processSubjectLocations(subject.locations)

  const onPlayPause = () => {
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
      <Media
        alt={t('Home.ZooniverseTalk.RecentSubjects.subjectLabel', { id: subjectID })}
        fit='contain'
        flex='shrink'
        subject={subject}
        src={subjectURL}
      />
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
        <Favorite />
        <Bookmark />
        <ShareOption />
        <SubtractCircle />
      </Box>
    </Box>
  )
}

SubjectTalkViewer.propTypes = {
  subject: shape({
    id: string
  })
}

export default SubjectTalkViewer
