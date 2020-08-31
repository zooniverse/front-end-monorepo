import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'grommet'
import { ZoomIn } from 'grommet-icons'
import { MetaToolsButton } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import en from './locales/en'

counterpart.registerTranslations('en', en)

function ZoomControlButton (props) {
  const {
    onClick = () => {},
    zooming = false
  } = props

  const label = (zooming) ? counterpart('ZoomControlButton.disable') : counterpart('ZoomControlButton.enable')

  return (
    <Box direction='row' justify='center' style={{ position: 'absolute', top: 0 }} width='100%'>
      <MetaToolsButton
        aria-checked={zooming}
        icon={<ZoomIn color={{ dark: 'light-3', light: 'light-6' }} size='small' />}
        text={label}
        onClick={onClick}
        role='radio'
      />
    </Box>

  )
}

ZoomControlButton.propTypes = {
  onClick: PropTypes.func,
  zooming: PropTypes.bool
}

export default ZoomControlButton