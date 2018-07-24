import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'

import rotateIcon from './rotateIcon'
import en from './locales/en'
import Button from '../Button'

counterpart.registerTranslations('en', en)

function RotateButton ({ onClick }) {
  return (
    <Button
      adjustments={{ y: '2' }}
      aria-label={counterpart('RotateButton.ariaLabel')}
      onClick={onClick}
    >
      {rotateIcon}
    </Button>
  )
}

RotateButton.propTypes = {
  onClick: PropTypes.func
}

RotateButton.defaultProps = {
  onClick: () => console.log(counterpart('RotateButton.ariaLabel'))
}

export default RotateButton
