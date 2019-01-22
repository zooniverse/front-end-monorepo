import React from 'react'
import { Box, Paragraph, Video as GrommetVideo } from 'grommet'
import counterpart from 'counterpart'
import en from './locales/en'
import { propTypes, defaultProps } from '../../helpers/mediaPropTypes'

counterpart.registerTranslations('en', en)

export default function Video({ alt, controls, fit, src }) {
  const controlsOption = (controls) ? 'below' : false
  return (
    <Box>
      <GrommetVideo a11yTitle={alt} controls={controlsOption} fit={fit} preload='metadata' src={src}>
        <Paragraph>{counterpart('Video.support')}</Paragraph>
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