import React from 'react'
import { Anchor, Box, Video as GrommetVideo } from 'grommet'
import { propTypes, defaultProps } from '../../helpers/mediaPropTypes'

export default function Video({ alt, controls, flex, fit, src }) {
  const controlsOption = (controls) ? 'below' : false
  return (
    <Box flex={flex}>
      <GrommetVideo a11yTitle={alt} controls={controlsOption} fit={fit} preload='metadata' src={src}>
        <Anchor href={src} label={alt} />
      </GrommetVideo>
    </Box>
  )
}

Video.propTypes = {
  ...propTypes
}

Video.defaultProps = {
  ...defaultProps
}