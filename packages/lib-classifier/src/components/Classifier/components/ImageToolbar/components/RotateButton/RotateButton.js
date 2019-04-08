import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'

import rotateIcon from './rotateIcon'
import en from './locales/en'
import Button from '../Button'

counterpart.registerTranslations('en', en)

function RotateButton ({ disabled, onClick }) {
  return (
    <Button
      a11yTitle={counterpart('RotateButton.ariaLabel')}
      disabled={disabled}
      onClick={onClick}
      svgAdjustments={{ y: '2' }}
    >
      {rotateIcon}
    </Button>
  )
}

RotateButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

RotateButton.defaultProps = {
  disabled: false,
  onClick: () => console.log(counterpart('RotateButton.ariaLabel'))
}

export default RotateButton
