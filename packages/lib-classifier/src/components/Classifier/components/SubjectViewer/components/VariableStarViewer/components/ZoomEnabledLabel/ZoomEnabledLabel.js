import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'grommet'
import { ZoomIn } from 'grommet-icons'
import { SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import en from '../../locales/en'

counterpart.registerTranslations('en', en)

function ZoomEnabledLabel (props) {
  const {
    show = false
  } = props

  if (!show) return null

  return (
    <Box direction='row' justify='center' style={{ position: 'absolute', bottom: '0' }} width='100%'>
      <ZoomIn size='small' />
      <SpacedText margin={{ horizontal: '1ch' }} size='xsmall'>{counterpart('VariableStarViewer.zoomEnabled')}</SpacedText>
    </Box>
  )
}

ZoomEnabledLabel.propTypes = {
  show: PropTypes.bool
}

export default ZoomEnabledLabel