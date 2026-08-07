import { Box, Video as GrommetVideo } from 'grommet'
import { node, number, string } from 'prop-types'
import styled from 'styled-components'

import MediaLink from '../../../MediaLink'
import getSubjectThumbnailSrc from '../../../../helpers/getSubjectThumbnailSrc'

const CONTROLS_HEIGHT = '64px'

const StyledBox = styled(Box)`
  position: relative;
`

const LinkBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - ${CONTROLS_HEIGHT});
  z-index: 10;
`

function Video({
  linkTitle,
  mediaSrc,
  previewHeight,
  subjectIdTitle,
  width,
  url
}) {
  const thumbnailSrc = getSubjectThumbnailSrc({
    height: previewHeight,
    src: mediaSrc,
    width
  })

  return (
    <StyledBox
      flex='grow'
      height={previewHeight}
      justify='center'
      width={width}
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
