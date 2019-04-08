import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'

import zoomOutIcon from './zoomOutIcon'
import en from './locales/en'
import Button from '../Button'

counterpart.registerTranslations('en', en)

function ZoomOutButton ({ onClick }) {
  return (
    <Button
      a11yTitle={counterpart('ZoomOutButton.ariaLabel')}
      onClick={onClick}
    >
      {zoomOutIcon}
    </Button>
  )
}

ZoomOutButton.propTypes = {
  onClick: PropTypes.func
}

ZoomOutButton.defaultProps = {
  onClick: () => console.log(counterpart('ZoomOutButton.ariaLabel'))
}

export default ZoomOutButton
