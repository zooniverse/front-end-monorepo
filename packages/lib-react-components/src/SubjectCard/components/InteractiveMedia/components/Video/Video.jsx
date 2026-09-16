import { Box, Video as GrommetVideo } from 'grommet'
import { number, string } from 'prop-types'
import styled from 'styled-components'
import { useState } from 'react'

import MediaLink from '../../../MediaLink'
import getSubjectThumbnailSrc from '../../../../helpers/getSubjectThumbnailSrc'

const CONTROLS_HEIGHT = '64px'

const StyledBox = styled(Box)`
  position: relative;

  // The only way to get to the GrommetVideo controls component
  // Hide the duration component until <video> metadata is loaded

  [class*='StyledVideoControls'] > div > div > div:nth-child(2) {
    display: ${props => props.$metadataLoaded ? 'flex' : 'none'}
  }
`

const LinkBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - ${CONTROLS_HEIGHT});
  z-index: 10;
`

function Video({ linkTitle, mediaSrc, previewHeight, subjectIdTitle, width, url }) {
  const thumbnailSrc = getSubjectThumbnailSrc({
    height: previewHeight,
    src: mediaSrc,
    width
  })

  /*
    Because we're using GrommetVideo for its controls easily positioned below the <video>
    and also the Zooniverse thumbnailer service to avoid loading a few MB per video subject,
    GrommetVideo's duration displays as `NaN` before video metadata is loaded. Once the video subject
    is interacted with via the play button, the metadata becomes available and we can show the
    actual duration and play progress.
  */
  const [metadataLoaded, setMetadataLoaded] = useState(false)

  function handleLoadedMetadata() {
    setMetadataLoaded(true)
  }

  return (
    <StyledBox
      flex='grow'
      height={previewHeight}
      justify='center'
      width={width}
      $metadataLoaded={metadataLoaded}
    >
      <LinkBox direction='row'>
        <MediaLink href={url} title={linkTitle} />
      </LinkBox>
      <GrommetVideo
        a11yTitle={subjectIdTitle}
        controls='below'
        fit='contain'
        preload={thumbnailSrc ? 'none' : 'metadata'}
        poster={thumbnailSrc}
        src={mediaSrc}
        onLoadedMetadata={handleLoadedMetadata}
      />
    </StyledBox>
  )
}

Video.propTypes = {
  linkTitle: string.isRequired,
  mediaSrc: string.isRequired,
  previewHeight: number.isRequired,
  subjectIdTitle: string.isRequired,
  width: number.isRequired,
  url: string.isRequired
}

export default Video
