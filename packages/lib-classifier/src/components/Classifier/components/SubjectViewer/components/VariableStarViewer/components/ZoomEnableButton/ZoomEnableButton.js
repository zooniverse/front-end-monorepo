import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'grommet'
import { ZoomIn } from 'grommet-icons'
import { MetaToolsButton } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import en from '../../locales/en'

counterpart.registerTranslations('en', en)

function ZoomEnableButton (props) {
  const {
    onClick = () => {},
    zooming = false
  } = props

  const label = (zooming) ? counterpart('VariableStarViewer.zoomEnabled') : counterpart('VariableStarViewer.enableZoom')

  return (
    <Box direction='row' justify='center' style={{ position: 'absolute', top: 0 }} width='100%'>
      <MetaToolsButton
        aria-checked={zooming}
        icon={<ZoomIn size='small' />}
        text={label}
        onClick={onClick}
        role='radio'
      />
    </Box>

  )
}

ZoomEnableButton.propTypes = {
  onClick: PropTypes.func,
  zooming: PropTypes.bool
}

export default ZoomEnableButton