import { Anchor, Box } from 'grommet'
import { bool, func, number, shape, string } from 'prop-types'
import styled from 'styled-components'

import { svgAudioIcon } from '../../../../../Media/components/Audio/Audio'
import MediaContainer from '../../../MediaContainer'

const CONTROLS_HEIGHT = '54px'
const encodedSvgAudioIcon = encodeURIComponent(svgAudioIcon)

const StyledBox = styled(Box)`
  background-image: url("data:image/svg+xml;charset=utf-8,${encodedSvgAudioIcon}");
  background-size: 120px 120px;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: calc(${props => props.$previewHeight}px - ${CONTROLS_HEIGHT});
`

function Audio({
  linkTitle,
  mediaSrc,
  previewHeight,
  selectProps,
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
      <MediaContainer
        href={url}
        selectProps={selectProps}
        title={linkTitle}
      >
        <StyledBox $previewHeight={previewHeight} />
      </MediaContainer>
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
  previewHeight: number.isRequired,
  selectProps: shape({
    onSelect: func,
    selectable: bool,
    selected: bool,
    selectLabel: string
  }),
  subjectIdTitle: string.isRequired,
  width: number.isRequired,
  url: string.isRequired
}
      
export default Audio
