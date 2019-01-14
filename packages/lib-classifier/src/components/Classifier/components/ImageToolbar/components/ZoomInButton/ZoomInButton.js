import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'

import ZoomInIcon from './ZoomInIcon'
import en from './locales/en'
import Button from '../Button'

counterpart.registerTranslations('en', en)

function ZoomInButton ({ onClick }) {
  return (
    <Button
      aria-label={counterpart('ZoomInButton.ariaLabel')}
      icon={<ZoomInIcon />}
      onClick={onClick}
    />
  )
}

ZoomInButton.propTypes = {
  onClick: PropTypes.func
}

ZoomInButton.defaultProps = {
  onClick: () => console.log(counterpart('ZoomInButton.ariaLabel'))
}

export default ZoomInButton
