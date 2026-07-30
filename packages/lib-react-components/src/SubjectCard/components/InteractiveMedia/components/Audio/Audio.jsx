import { Anchor, Box } from 'grommet'
import { node, number, string } from 'prop-types'
import styled, { css } from 'styled-components'

import { svgAudioIcon } from '../../../../../Media/components/Audio/Audio'
import MediaLink from '../../../MediaLink'

const CONTROLS_HEIGHT = '54px'

const StyledBox = styled(Box)`
  background-image: url("data:image/svg+xml;base64,${btoa(svgAudioIcon)}");
  background-size: 120px 120px;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: calc(${props => props.$previewHeight}px - ${CONTROLS_HEIGHT});
`

function Audio({
  linkTitle,
  mediaSrc,
  placeholder,
  previewHeight,
  subjectIdTitle,
  width,
  url
}) {
  return (
    <Box
      direction='column'
      height={previewHeight}
      width={width}
    >
      <MediaLink href={url} title={linkTitle}>
        <StyledBox $previewHeight={previewHeight} />
      </MediaLink>
      <audio
        aria-label={subjectIdTitle}
        controls
        preload='metadata'
        style={{ width: '100%' }}
      >
        <source src={mediaSrc} />
        <Anchor href={mediaSrc} label={linkTitle} />
      </audio>
    </Box>
  )
}

Audio.propTypes = {
  linkTitle: string.isRequired,
  mediaSrc: string.isRequired,
  placeholder: node,
  previewHeight: number.isRequired,
  subjectIdTitle: string.isRequired,
  width: number.isRequired,
  url: string.isRequired
}
      
export default Audio
