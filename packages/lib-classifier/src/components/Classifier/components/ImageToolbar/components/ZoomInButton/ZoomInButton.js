import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'

import zoomInIcon from './zoomInIcon'
import en from './locales/en'
import Button from '../Button'

counterpart.registerTranslations('en', en)

function ZoomInButton ({ onClick }) {
  return (
    <Button
      a11yTitle={counterpart('ZoomInButton.ariaLabel')}
      onClick={onClick}
    >
      {zoomInIcon}
    </Button>
  )
}

ZoomInButton.propTypes = {
  onClick: PropTypes.func
}

ZoomInButton.defaultProps = {
  onClick: () => console.log(counterpart('ZoomInButton.ariaLabel'))
}

export default ZoomInButton
